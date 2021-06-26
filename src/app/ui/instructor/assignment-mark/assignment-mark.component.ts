import { Component, OnInit } from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';

@Component({
  selector: 'app-assignment-mark',
  templateUrl: './assignment-mark.component.html',
  styleUrls: ['./assignment-mark.component.scss']
})
export class AssignmentMarkComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.assignment_mark];
  tableColumns?: Array<TableColumn> = [TableColumn.assignment_student, TableColumn.assignment_status,
    TableColumn.assignment_feedback_datetime, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.assignment_school, FilterAction.assignment_group];
  constructor() { }

  ngOnInit(): void {
  }

}
