import { Component, OnInit } from '@angular/core';
import {HomeCategory} from '../../../core/models/home-category';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  homeCategories: Array<HomeCategory> = [
    {title: 'Account & Grouping Creation', description: 'Create user accounts, schools and groups',
      image_url: '', link_text: 'Go', target_url: 'account/create'},
    {title: 'Delete Account', description: 'Delete User Accounts',
      image_url: '', link_text: 'Go', target_url: 'account/delete'},
    {title: 'Manage Freelancers', description: 'Calculate freelance wages and more',
      image_url: '', link_text: 'Go', target_url: 'wages/view'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
