import {Component, Input, OnInit} from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {
  filterActions?: Array<FilterAction> = [FilterAction.assignment_school, FilterAction.assignment_group];
  tableActions?: Array<TableAction> = [TableAction.assignment_edit, TableAction.assignment_delete];
  tableColumns?: Array<TableColumn> = [TableColumn.assignment_name, TableColumn.assignment_due_datetime, TableColumn.actions];
  constructor() { }

  ngOnInit(): void {
  }

}
