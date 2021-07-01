import {Component, Input, OnInit} from '@angular/core';
import {HomeCategory} from '../../../core/models/home-category';
import {FilterAction, FilterActionLabel} from '../../../core/models/FilterAction';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Input() filterActions?: Array<FilterAction>;
  FilterAction = FilterAction;
  FilterActionLabel = FilterActionLabel;
  options = {
    School: [
      {key: 'Select School', selected: 'selected'},
      {key: 'School 1', selected: ''},
      {key: 'School 2', selected: ''},
      {key: 'School 3', selected: ''},
      {key: 'School 4', selected: ''},
      {key: 'School 5', selected: ''},
    ],
    Group: [
      {key: 'Select Group', selected: 'selected'},
      {key: 'Group 1', selected: ''},
      {key: 'Group 2', selected: ''},
      {key: 'Group 3', selected: ''},
      {key: 'Group 4', selected: ''},
      {key: 'Group 5', selected: ''},
    ],
    'Feedback Status': [
      {key: 'Select Feedback Status', selected: 'selected'},
      {key: 'With Feedback', selected: ''},
      {key: 'Without Feedback', selected: ''},
    ],
    'Completion Status': [
      {key: 'Select Completion Status', selected: 'selected'},
      {key: 'Ongoing', selected: ''},
      {key: 'Completed', selected: ''},
    ],
    Role: [
      {key: 'Select Role', selected: 'selected'},
      {key: 'Admin', selected: ''},
      {key: 'Freelancer', selected: ''},
      {key: 'Student', selected: ''},
      {key: 'Instructor', selected: ''},
    ],
    Month: [
      {key: 'Select Month', selected: 'selected'},
      {key: 'Jan', selected: ''},
      {key: 'Feb', selected: ''},
      {key: 'Mar', selected: ''},
      {key: 'Apr', selected: ''},
      {key: 'May', selected: ''},
      {key: 'Jun', selected: ''},
      {key: 'Jul', selected: ''},
      {key: 'Aug', selected: ''},
      {key: 'Sep', selected: ''},
      {key: 'Oct', selected: ''},
      {key: 'Nov', selected: ''},
      {key: 'Dec', selected: ''},
    ],
    Year: [
      {key: 'Select Year', selected: 'selected'},
      {key: '2010', selected: ''},
      {key: '2011', selected: ''},
      {key: '2012', selected: ''},
      {key: '2013', selected: ''},
      {key: '2014', selected: ''},
      {key: '2015', selected: ''},
      {key: '2016', selected: ''},
      {key: '2017', selected: ''},
      {key: '2018', selected: ''},
      {key: '2019', selected: ''},
      {key: '2020', selected: ''},
      {key: '2021', selected: ''},
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onSelect($event, filterAction) {
    console.log(filterAction, $event.target.value);
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        [filterAction]: $event.target.value
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }
}
