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
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.url = this.router.url;
    console.log(this.url);
  }

  logOut() {
    this.router.navigate(['login']);
  }
}
