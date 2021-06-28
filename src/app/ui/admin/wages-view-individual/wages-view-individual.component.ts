import {Component, Input, OnInit} from '@angular/core';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {TableAction} from '../../../core/models/TableAction';
import {Student} from '../../../core/models/student';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {WageService} from '../../../core/services/wage.service';
import {Freelancer} from '../../../core/models/freelancer';
import {Wage} from '../../../core/models/wage';
import {FreelancerService} from '../../../core/services/freelancer.service';

@Component({
  selector: 'app-wages-view-individual',
  templateUrl: './wages-view-individual.component.html',
  styleUrls: ['./wages-view-individual.component.scss']
})
export class WagesViewIndividualComponent implements OnInit {
  tableActions?: Array<TableAction> = [];
  tableColumns?: Array<TableColumn> = [TableColumn.wage_created_datetime, TableColumn.wage_hours];
  filterActions?: Array<FilterAction> = [FilterAction.wage_created_datetime];
  freelancer: Freelancer;
  freelancerDocId: string;
  wages: Array<Wage>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private freelancerService: FreelancerService,
    private wageService: WageService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.freelancerDocId = params.freelancerDocId;
      if (this.freelancerDocId) {
        this.freelancer = await this.freelancerService.getFreelancer(this.freelancerDocId)
          .pipe(first())
          .toPromise();
        console.log(this.freelancer);
        this.wageService.getWagesByFreelancer(this.freelancerDocId).subscribe(async (wages) => {
          this.wages = wages;
          console.log(this.wages);
        });
      }

    });

  }
  onGoBackClick() {
    this.router.navigate(['wages/view']);
  }

}
