import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {AssignmentService} from '../../../core/services/assignment.service';
import {StudentService} from '../../../core/services/student.service';
import {Student} from '../../../core/models/student';
import {first} from 'rxjs/operators';
import {Assignment} from '../../../core/models/assignment';
import {ActivatedRoute} from '@angular/router';
import {FilterService} from '../../../core/services/filter.service';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {CommonTableComponent} from '../../../shared/components/common-table/common-table.component';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {
  filterActions?: Array<FilterAction> = [FilterAction.assignment_school, FilterAction.assignment_group];
  tableActions?: Array<TableAction> = [TableAction.assignment_edit, TableAction.assignment_delete];
  tableColumns?: Array<TableColumn> = [TableColumn.position, TableColumn.assignment_name, TableColumn.assignment_due_datetime,
    TableColumn.assignment_school, TableColumn.assignment_group, TableColumn.actions];
  assignments: Array<Assignment>;
  instructorDocId = localStorage.getItem('activeDocId');
  assignmentDocId: string;
  @ViewChild(CommonTableComponent) commonTableComponent: CommonTableComponent;
  constructor(
    private assignmentService: AssignmentService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.assignmentDocId = params.assignmentDocId;
      const school = params.assignment_school ? params.assignment_school : '';
      const group = params.assignment_group ? params.assignment_group : '';
      this.filterService.get('assignments', 'instructorDocId', '==', this.instructorDocId,
        'school', '==', school,
        'group', '==', group).subscribe(async (assignments) => {
       this.assignments = assignments;
       this.commonTableComponent.loadTableData(this.assignments);
      });
    });

  }

}
