import { Component, OnInit } from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {Freelancer} from '../../../core/models/freelancer';
import {ActivatedRoute, Router} from '@angular/router';
import {FreelancerService} from '../../../core/services/freelancer.service';
import {Account} from '../../../core/models/account';
import {AccountService} from '../../../core/services/account.service';
import {FilterService} from '../../../core/services/filter.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.account_delete];
  tableColumns?: Array<TableColumn> = [TableColumn.account_role, TableColumn.account_created_datetime,
    TableColumn.account_username, TableColumn.account_school, TableColumn.account_group, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.account_role, FilterAction.account_school, FilterAction.account_group];
  accounts?: Array<Account>;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const role = params.account_role ? params.account_role : '';
      const school = params.account_school ? params.account_school : '';
      const group = params.account_group ? params.account_group : '';
      this.filterService.get('accounts', 'role', '==', role)?.subscribe(async (accounts) => {
        const filteredAccounts = [];
        for (const account of accounts) {
          const asci = await this.filterService.getByDocId(account.role.toLowerCase() + 's', account.ownerDocId)
            .pipe(first())
            .toPromise();
          if ( asci && ((school === '' && group === '') || (group === '' && asci.school === school) ||
            (school === '' && asci.group === group)  || (asci.school === school && asci.group === group)) ) {
              account.school = asci.school;
              account.group = asci.group;
              filteredAccounts.push(account);
          }
        }
        this.accounts = filteredAccounts;

        console.log(this.accounts);


      });
      // this.accountService.getAccounts().subscribe(async (accounts) => {
      //   this.accounts = accounts;
      //   console.log(this.accounts);
      // });
    });

  }
  onGoBackClick() {
    this.router.navigate(['home/admin']);
  }

}
