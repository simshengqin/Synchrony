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
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params.assignment_school || params.wage_school || params.account_school) {
        for (let i = 0; i < this.options.School.length; i++) {
          this.options.School[i].selected = '';
          if (this.options.School[i].key === params.assignment_school || this.options.School[i].key === params.wage_school ||
            this.options.School[i].key === params.account_school) {
            this.options.School[i].selected = 'selected';
          }
        }
      }
      if (params.assignment_group || params.wage_group || params.account_group) {
        for (let i = 0; i < this.options.Group.length; i++) {
          this.options.Group[i].selected = '';
          if (this.options.Group[i].key === params.assignment_group || this.options.Group[i].key === params.wage_group ||
            this.options.Group[i].key === params.account_group) {
            this.options.Group[i].selected = 'selected';
          }
        }
      }
      if (params.assignment_feedback) {
        for (let i = 0; i < this.options['Feedback Status'].length; i++) {
          this.options['Feedback Status'][i].selected = '';
          if (this.options['Feedback Status'][i].key === params.assignment_feedback) {
            this.options['Feedback Status'][i].selected = 'selected';
          }
        }
      }
      if (params.assignment_completion_status) {
        for (let i = 0; i < this.options['Completion Status'].length; i++) {
          this.options['Completion Status'][i].selected = '';
          if (this.options['Completion Status'][i].key === params.assignment_completion_status) {
            this.options['Completion Status'][i].selected = 'selected';
          }
        }
      }

      if (params.account_role) {
        for (let i = 0; i < this.options.Role.length; i++) {
          this.options.Role[i].selected = '';
          if (this.options.Role[i].key === params.account_role) {
            this.options.Role[i].selected = 'selected';
          }
        }
      }
      if (params.wage_month) {
        for (let i = 0; i < this.options.Month.length; i++) {
          this.options.Month[i].selected = '';
          if (this.options.Month[i].key === params.wage_month) {
            this.options.Month[i].selected = 'selected';
          }
        }
      }
      if (params.wage_year) {
        for (let i = 0; i < this.options.Year.length; i++) {
          this.options.Year[i].selected = '';
          if (this.options.Year[i].key === params.wage_year) {
            this.options.Year[i].selected = 'selected';
          }
        }
      }
    });
  }

  onSelect($event, filterAction) {
    console.log(filterAction, $event.target.value);
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
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
