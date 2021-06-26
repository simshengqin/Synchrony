import {Component} from '@angular/core';
import {HomeCategory} from '../../../core/models/home-category';

@Component({
  selector: 'app-explore-categories',
  templateUrl: './explore-categories.component.html',
  styleUrls: ['./explore-categories.component.scss']
})
export class ExploreCategoriesComponent {
  homeCategories: Array<HomeCategory>;

}
