import { Component, OnInit } from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';

@Component({
  selector: 'app-assignment-view',
  templateUrl: './assignment-view.component.html',
  styleUrls: ['./assignment-view.component.scss']
})
export class AssignmentViewComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.assignment_submit, TableAction.assignment_resubmit];
  showOngoing = true;
  tableColumns?: Array<TableColumn> = [TableColumn.assignment_name,
    TableColumn.assignment_status, TableColumn.assignment_due_datetime,
    TableColumn.assignment_instructor, TableColumn.actions];

  constructor() { }

  ngOnInit(): void {
  }

}
