import {Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {TableAction} from '../../../core/models/TableAction';

@Component({
  selector: 'app-wages-view',
  templateUrl: './wages-view.component.html',
  styleUrls: ['./wages-view.component.scss']
})
export class WagesViewComponent implements OnInit {
  tableActions?: Array<TableAction> = [];
  tableColumns?: Array<TableColumn> = [TableColumn.wage_created_datetime, TableColumn.wage_hours, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.wage_school, FilterAction.wage_group];
  constructor() { }

  ngOnInit(): void {
  }

}
