import { Component, OnInit } from '@angular/core';
import {HomeCategory} from '../../../core/models/home-category';
import {LoginService} from '../../../core/services/login.service';

@Component({
  selector: 'app-instructor-home',
  templateUrl: './instructor-home.component.html',
  styleUrls: ['./instructor-home.component.scss']
})
export class InstructorHomeComponent implements OnInit {
  homeCategories: Array<HomeCategory> = [
    {title: 'New Assignments', description: 'Create assignments for students',
      image_url: '', link_text: 'Create new assignment', target_url: 'assignment/new'},
    {title: 'Edit Assignments', description: 'View & edit assignments',
      image_url: '', link_text: 'View assignment', target_url: 'assignment/edit'},
    {title: 'Mark Assignments', description: 'Mark assignments for students',
      image_url: '', link_text: 'Mark assignment', target_url: 'assignment/mark'}
  ];
  constructor(
    // private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('activeRole'));
    console.log(localStorage.getItem('activeDocId'));
    // console.log(this.loginService.getActiveAccount());
    // console.log(this.loginService.getActiveRole());
    // console.log(this.loginService.getActiveDocId());
  }
}
