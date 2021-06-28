import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {FirestoreService} from './firestore.service';
import {Account} from '../models/account';
import {Assignment} from '../models/assignment';

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
  deleteAccount(docId: string): Promise<void> {
    return this.fs.delete('accounts/' + docId);
  }


}
