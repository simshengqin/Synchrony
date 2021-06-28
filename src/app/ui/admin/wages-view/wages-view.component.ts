import {Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {TableAction} from '../../../core/models/TableAction';
import {FreelancerService} from '../../../core/services/freelancer.service';
import {Freelancer} from '../../../core/models/freelancer';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wages-view',
  templateUrl: './wages-view.component.html',
  styleUrls: ['./wages-view.component.scss']
})
export class WagesViewComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.freelancer_hours];
  tableColumns?: Array<TableColumn> = [TableColumn.freelancer_username, TableColumn.freelancer_school,
    TableColumn.freelancer_group , TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.wage_school, FilterAction.wage_group];
  freelancers?: Array<Freelancer>;
  freelancerDocId: string;
  constructor(
    private router: Router,
    private freelancerService: FreelancerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.freelancerDocId = params.freelancerDocId;
    });
    this.freelancerService.getFreelancers().subscribe(async (freelancers) => {
      this.freelancers = freelancers;
      console.log('tt');
      console.log(this.freelancers);
    });
  }
  onGoBackClick() {
    this.router.navigate(['home/admin']);
  }
}
