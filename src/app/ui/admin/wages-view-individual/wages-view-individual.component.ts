import { Component, OnInit } from '@angular/core';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {TableAction} from '../../../core/models/TableAction';

@Component({
  selector: 'app-wages-view-individual',
  templateUrl: './wages-view-individual.component.html',
  styleUrls: ['./wages-view-individual.component.scss']
})
export class WagesViewIndividualComponent implements OnInit {
  tableActions?: Array<TableAction> = [];
  tableColumns?: Array<TableColumn> = [TableColumn.wage_created_datetime, TableColumn.wage_hours, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.wage_created_datetime];
  constructor() { }

  ngOnInit(): void {
  }

}
