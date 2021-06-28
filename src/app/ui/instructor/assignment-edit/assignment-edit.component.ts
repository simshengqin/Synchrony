import {Component, OnInit} from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {AssignmentService} from '../../../core/services/assignment.service';
import {StudentService} from '../../../core/services/student.service';
import {Student} from '../../../core/models/student';
import {first} from 'rxjs/operators';
import {Assignment} from '../../../core/models/assignment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {
  filterActions?: Array<FilterAction> = [FilterAction.assignment_school, FilterAction.assignment_group];
  tableActions?: Array<TableAction> = [TableAction.assignment_edit, TableAction.assignment_delete];
  tableColumns?: Array<TableColumn> = [TableColumn.assignment_name, TableColumn.assignment_due_datetime,
    TableColumn.assignment_school, TableColumn.assignment_group, TableColumn.actions];
  assignments: Array<Assignment>;
  instructorDocId = localStorage.getItem('activeDocId');
  assignmentDocId: string;
  constructor(
    private assignmentService: AssignmentService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.assignmentDocId = params.assignmentDocId;
    });
    this.assignmentService.getAssignmentsByInstructor(this.instructorDocId).subscribe(async (assignments) => {
      for (const assignment of assignments) {
        let student: Student;
        student = await this.studentService.getStudent(assignment.studentDocId)
          .pipe(first())
          .toPromise();
        assignment.student = student;
      }
      this.assignments = assignments;
      console.log(this.assignments);
    });
  }

}
