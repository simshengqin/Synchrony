import {Component, OnInit, ViewChild} from '@angular/core';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {TableAction} from '../../../core/models/TableAction';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Freelancer} from '../../../core/models/freelancer';
import {Wage} from '../../../core/models/wage';
import {FreelancerService} from '../../../core/services/freelancer.service';
import {FilterService} from '../../../core/services/filter.service';
import {CommonTableComponent} from '../../../shared/components/common-table/common-table.component';

@Component({
  selector: 'app-wages-view-individual',
  templateUrl: './wages-view-individual.component.html',
  styleUrls: ['./wages-view-individual.component.scss']
})
export class WagesViewIndividualComponent implements OnInit {
  tableActions?: Array<TableAction> = [];
  tableColumns?: Array<TableColumn> = [TableColumn.wage_created_datetime, TableColumn.wage_hours];
  filterActions?: Array<FilterAction> = [FilterAction.wage_month, FilterAction.wage_year];
  freelancer: Freelancer;
  freelancerDocId: string;
  wages: Array<Wage>;
  @ViewChild(CommonTableComponent) commonTableComponent: CommonTableComponent;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private freelancerService: FreelancerService,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.freelancerDocId = params.freelancerDocId;
      if (this.freelancerDocId) {
        this.freelancer = await this.freelancerService.getFreelancer(this.freelancerDocId)
          .pipe(first())
          .toPromise();
        console.log(this.freelancer);
        const wageMonth = params.wage_month ? params.wage_month : '';
        const wageYear = params.wage_year ? params.wage_year : '';
        console.log('Before');
        this.filterService.get('wages').subscribe(async (wages) => {

          // tslint:disable-next-line:triple-equals
          if (wageMonth == '' && wageYear == '') {
            this.wages = wages;
          }
          else {
            const filteredWages = [];
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            for (let i = 0; i < wages.length; i++) {
              const wageDate = new Date(wages[i].created_datetime);
              console.log(monthNames[wageDate.getMonth()] + ',' +  wageDate.getFullYear() + ',' + wageMonth + ',' + wageYear + ',');
              // tslint:disable-next-line:triple-equals
              if ((wageMonth == '' || monthNames[wageDate.getMonth()] == wageMonth) &&
                (wageYear == '' || wageDate.getFullYear() == wageYear)) {
                console.log('yesss');
                filteredWages.push(wages[i]);
              }
            }
            this.wages = filteredWages;
          }
          this.commonTableComponent.loadTableData(this.wages);
          console.log(this.wages);
        });
        // this.wageService.getWagesByFreelancer(this.freelancerDocId).subscribe(async (wages) => {
        //   this.wages = wages;
        //   console.log(this.wages);
        // });
      }

    });

  }
  onGoBackClick() {
    this.router.navigate(['wages/view']);
  }

}
