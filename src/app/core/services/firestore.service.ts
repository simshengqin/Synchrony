import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  Action, AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup,
  AngularFirestoreDocument, DocumentChangeAction, DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists, QueryFn, QueryGroupFn
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) {
  }

  createId(): string {
    return this.afs.createId();
  }

  col<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  colGroup<T>(collectionId: string, queryGroupFn?: QueryGroupFn<T>): AngularFirestoreCollectionGroup<T> {
    return this.afs.collectionGroup<T>(collectionId, queryGroupFn);
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map((doc: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
          if (doc.payload.data()) {
            return {...doc.payload.data(), docId: doc.payload.id} as T;
          }
          return null;
        }),
      );
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?: QueryFn): Observable<any[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => {
          return docs.map((a: DocumentChangeAction<T>) => {
            const data = a.payload.doc.data() as T;
            const docId = a.payload.doc.id;
            return {...data, docId};
          }) as T[];
        }),
      );
  }

  colGroup$<T>(collectionId: string, queryGroupFn?: QueryGroupFn): Observable<T[]> {
    return this.colGroup(collectionId, queryGroupFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => {
          return docs.map((a: DocumentChangeAction<T>) => {
            const data = a.payload.doc.data() as T;
            const docId = a.payload.doc.id;
            return {...data, docId};
          }) as T[];
        }),
      );
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  async set<T>(ref: DocPredicate<T>, data: any, options?: { merge: boolean }): Promise<void> {
    const _merge: boolean = options?.merge ?? false;
    await this.doc(ref).set(data, {merge: _merge});
  }

  async update<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    await this.doc(ref).update(data);
  }

  async delete<T>(ref: DocPredicate<T>): Promise<void> {
    await this.doc(ref).delete();
  }

  add<T>(ref: CollectionPredicate<T>, data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      this.col(ref).add(data).then((docRef) => {
        return resolve(docRef.id);
      }).catch(reject);
    });
  }

  setOrAdd(path: string, data: any): Promise<any> {
    const segments = path.split('/').filter(v => v);
    if (segments.length % 2) {
      // Odd is always a collection
      return this.col(path).add(data);
    } else {
      // Even is always document
      return this.doc(path).set(data);
    }
  }

  upsert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    const doc = this.doc(ref)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();

    return doc.then((snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>) => {
      return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
    });
  }
}
