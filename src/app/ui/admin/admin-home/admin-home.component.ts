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
      image_url: 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/ui%2Fhome_assignment_create.png?alt=media&token=e4e2b327-779f-44a9-9466-038fb3d7d495',
      link_text: 'Create Account & Groups', target_url: 'account/create'},
    {title: 'Delete Accounts', description: 'Delete User Accounts',
      image_url: 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/ui%2Fhome_assignment_delete.png?alt=media&token=e5933468-945d-46cd-b33d-708b524e1331',
      link_text: 'Delete Accounts', target_url: 'account/delete'},
    {title: 'Manage Freelancers', description: 'Calculate freelance wages and more',
      image_url: 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/ui%2Fhome_manage_freelancers.png?alt=media&token=0f87a8e1-00d5-44b6-adce-3e2859b4c1ec',
      link_text: 'Manage Freelancers', target_url: 'wages/view'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
