import { Component, OnInit } from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {Freelancer} from '../../../core/models/freelancer';
import {ActivatedRoute, Router} from '@angular/router';
import {FreelancerService} from '../../../core/services/freelancer.service';
import {Account} from '../../../core/models/account';
import {AccountService} from '../../../core/services/account.service';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.account_delete];
  tableColumns?: Array<TableColumn> = [TableColumn.account_role, TableColumn.account_created_datetime,
    TableColumn.account_username, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.account_role, FilterAction.account_school, FilterAction.account_group];
  accounts?: Array<Account>;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.freelancerDocId = params.freelancerDocId;
    // });
    this.accountService.getAccounts().subscribe(async (accounts) => {
      this.accounts = accounts;
      console.log(this.accounts);
    });
  }
  onGoBackClick() {
    this.router.navigate(['home/admin']);
  }

}
