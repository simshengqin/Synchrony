import {Component, Input, OnInit} from '@angular/core';
import {HomeCategory} from '../../../core/models/home-category';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.scss']
})
export class ExploreCategoriesComponent implements OnInit {
  @Input() homeCategories: Array<HomeCategory>;
  constructor() { }

  ngOnInit(): void {
  }
}
