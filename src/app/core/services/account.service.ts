import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {FirestoreService} from './firestore.service';
import {Account} from '../models/account';
import {Assignment} from '../models/assignment';
import {Admin} from '../models/admin';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(
    private fs: FirestoreService
  ) {
  }
  setAccount(data: Account): Promise<string> {
    console.log(data);
    return this.fs.add('accounts', data);
  }
  getAccounts(): Observable<Array<Account>> {
    return this.fs.col$('accounts', ref => {
      return ref;
        // .orderBy('createdDatetime', 'desc');
    });
  }
  getAccount(id: string): Observable<Account> {
    return this.fs.doc$('accounts/' + id);
  }
  getAccountByUsername(username: string): Observable<Array<Account>> {
    return this.fs.col$('accounts', ref => {
      return ref
        .where('username', '==', username);
    });
  }
  getAccountByUsernameAndPassword(username: string, password: string): Observable<Array<Account>> {
    return this.fs.col$('accounts', ref => {
      return ref
        .where('username', '==', username)
        .where('password', '==', password);
    });
  }
  updateAccount(docId: string, data: Account): Promise<void> {
    return this.fs.update('accounts/' + docId, data);
  }
  deleteAccount(docId: string): Promise<void> {
    return this.fs.delete('accounts/' + docId);
  }


}
