import { Component, OnInit } from '@angular/core';
import {HomeCategory} from '../../core/models/home-category';

@Component({
  selector: 'app-home-instructor',
  templateUrl: './home-instructor.component.html',
  styleUrls: ['./home-instructor.component.scss']
})
export class HomeInstructorComponent implements OnInit {
  homeCategories: Array<HomeCategory> = [
    {title: 'New Assignments', description: 'Create assignments for students',
      image_url: '', link_text: 'Create new assignment', target_url: ''},
    {title: 'Edit Assignments', description: 'View & edit assignments',
      image_url: '', link_text: 'View assignment', target_url: ''},
    {title: 'Mark Assignments', description: 'Mark assignments for students',
      image_url: '', link_text: 'Mark assignment', target_url: ''}
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
