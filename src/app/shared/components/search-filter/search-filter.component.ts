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
      {key: 'With Feedback', selected: ''},
      {key: 'Without Feedback', selected: ''},
    ],
    'Completion Status': [
      {key: 'Ongoing', selected: ''},
      {key: 'Completed', selected: ''},
    ],
    Role: [
      {key: 'Admin', selected: ''},
      {key: 'Freelancer', selected: ''},
      {key: 'Student', selected: ''},
      {key: 'Instructor', selected: ''},
    ],
    'Month/Year': [
      {key: 'Jan 2021', selected: ''},
      {key: 'Feb 2021', selected: ''},
      {key: 'Mar 2021', selected: ''},
      {key: 'Apr 2021', selected: ''},
      {key: 'May 2021', selected: ''},
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
