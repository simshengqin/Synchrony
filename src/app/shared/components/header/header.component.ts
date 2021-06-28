import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
  ) { }

  ngOnInit(): void {
    this.url = this.router.url;
    console.log(this.url);
  }

  logOut() {
    localStorage.setItem('activeUsername', '');
    localStorage.setItem('activeRole', '');
    localStorage.setItem('activeDocId', '');
    this.router.navigate(['login']);
  }
}
