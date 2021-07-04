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
      image_url: 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/ui%2Fhome_assignment_new.jpg?alt=media&token=8e41ad21-4c87-461e-bacb-6f7596cca34e',
      link_text: 'New Assignments', target_url: 'assignment/new'},
    {title: 'Edit Assignments', description: 'View & edit assignments',
      image_url: 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/ui%2Fhome_assignment_edit.jpg?alt=media&token=b90baa0b-80f2-493f-aab0-69364d1e749b',
      link_text: 'Edit Assignments', target_url: 'assignment/edit'},
    {title: 'Mark Assignments', description: 'Mark assignments for students',
      image_url: 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/ui%2Fhome_assignment_mark.jpg?alt=media&token=7156b15a-b79e-422c-a539-2ad65eaa0348',
      link_text: 'Mark Assignments', target_url: 'assignment/mark'}
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
