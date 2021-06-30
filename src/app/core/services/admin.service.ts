import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {FirestoreService} from './firestore.service';
import {Admin} from '../models/admin';
import {Assignment} from '../models/assignment';
import {Account} from '../models/account';
@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setAdmin(data: Admin): Promise<string> {
    console.log(data);
    return this.fs.add('admins', data);
  }
  getAdmins(): Observable<Array<Admin>> {
    return this.fs.col$('admins', ref => {
      return ref;
      // .orderBy('createdDatetime', 'desc');
    });
  }
  getAdmin(id: string): Observable<Admin> {
    return this.fs.doc$('admins/' + id);
  }

  updateAdmin(docId: string, data: Admin): Promise<void> {
    return this.fs.update('admins/' + docId, data);
  }
  deleteAdmin(docId: string): Promise<void> {
    return this.fs.delete('admins/' + docId);
  }
}
