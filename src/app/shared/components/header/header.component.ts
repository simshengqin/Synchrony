import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() role: string;
  url: string;
  activeUsername = localStorage.getItem('activeUsername');
  activeRole = localStorage.getItem('activeRole');
  constructor(
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.url = this.router.url;
    console.log(this.url);
  }

  logOut() {
    localStorage.setItem('activeUsername', '');
    localStorage.setItem('activeRole', '');
    localStorage.setItem('activeDocId', '');
    this.toastrService.success('Logged out successfully!', '',{positionClass: 'toast-top-center'});
    this.router.navigate(['login']);
  }
}
