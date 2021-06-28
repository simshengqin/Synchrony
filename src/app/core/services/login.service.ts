import {Injectable} from '@angular/core';
import {Account} from '../models/account';

@Injectable()
export class LoginService {
  private activeAccount: Account;
  private activeRole: string;
  // if activeRole is instructor, it is instructorDocId etc
  private activeDocId: string;
  constructor() {}

  setActiveAccount(activeAccount: Account) {
    this.activeAccount = activeAccount;
  }

  getActiveAccount() {
    return this.activeAccount;
  }
  setActiveRole( activeRole: string) {
    this.activeRole = activeRole;
  }

  getActiveRole() {
    return this.activeRole;
  }

  setActiveDocId( activeDocId: string) {
    this.activeDocId = activeDocId;
  }

  getActiveDocId() {
    return this.activeDocId;
  }
}
