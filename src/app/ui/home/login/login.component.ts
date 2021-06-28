import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Instructor} from '../../../core/models/instructor';
import {first} from 'rxjs/operators';
import {AccountService} from '../../../core/services/account.service';
import {Account, Role} from '../../../core/models/account';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {Router} from '@angular/router';
import {LoginService} from '../../../core/services/login.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    // private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
  ) { }
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  account: Account;
  ngOnInit(): void {
  }
  login() {
    this.accountService.getAccountByUsernameAndPassword(this.username.nativeElement.value, this.password.nativeElement.value)
      .subscribe(async (accounts) => {
        console.log(accounts);
        if (accounts.length === 0) {
          this.toastrService.error('Wrong username/password combination!', '',{positionClass: 'toast-top-center'});
        }
        else {
          this.account = accounts[0];
          localStorage.setItem('activeUsername', this.account.username);
          localStorage.setItem('activeRole', this.account.role);
          localStorage.setItem('activeDocId', this.account.ownerDocId);
          // this.loginService.setActiveAccount(this.account);
          // this.loginService.setActiveRole(this.account.role);
          // this.loginService.setActiveDocId(this.account.ownerDocId);
          // console.log(this.loginService.getActiveAccount());
          // console.log(this.loginService.getActiveRole());
          // console.log(this.loginService.getActiveDocId());
          // this.confirmModalComponent.open('Login', 'Logged in successfully!', ['ok']);
          this.onCloseModal();
          this.toastrService.success('Logged in successfully!', '',{positionClass: 'toast-top-center'});
          console.log(this.account.role);
        }
    });
  }

  goSignUpPage() {
    this.router.navigate(['signup']);
  }

  onCloseModal() {
    switch (this.account.role) {
      case Role.student:
        this.router.navigate(['assignment/view']);
        break;
      case Role.admin:
        this.router.navigate(['home/admin']);
        break;

      case Role.instructor:
        this.router.navigate(['home/instructor']);
        break;
      case Role.freelancer:
        this.router.navigate(['home/instructor']);
        break;
    }
  }
}
