import { Component, OnInit } from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.scss']
})
export class AccountDeleteComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.account_delete];
  tableColumns?: Array<TableColumn> = [TableColumn.account_username, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.account_role, FilterAction.account_school, FilterAction.account_group];
  constructor() { }

  ngOnInit(): void {
  }

}
