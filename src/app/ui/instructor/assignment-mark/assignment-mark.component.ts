import { Component, OnInit } from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {Instructor} from '../../../core/models/instructor';
import {first} from 'rxjs/operators';
import {AssignmentService} from '../../../core/services/assignment.service';
import {Assignment} from '../../../core/models/assignment';
import {StudentService} from '../../../core/services/student.service';
import {Student} from '../../../core/models/student';

@Component({
  selector: 'app-assignment-mark',
  templateUrl: './assignment-mark.component.html',
  styleUrls: ['./assignment-mark.component.scss']
})
export class AssignmentMarkComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.assignment_mark];
  tableColumns?: Array<TableColumn> = [TableColumn.assignment_name, TableColumn.assignment_student, TableColumn.assignment_status
    , TableColumn.assignment_due_datetime, TableColumn.assignment_feedback_datetime, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.assignment_school, FilterAction.assignment_group];
  assignments: Array<Assignment>;
  // Hardcoded instructor id
  instructorId = '9KunUkUy4bjYdhuRrHs8';
  constructor(
    private assignmentService: AssignmentService,
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.assignmentService.getAssignmentsByInstructor(this.instructorId).subscribe(async (assignments) => {
      for (const assignment of assignments) {
        let student: Student;
        student = await this.studentService.getStudent(assignment.studentId)
          .pipe(first())
          .toPromise();
        assignment.student = student;
      }
      this.assignments = assignments;
      console.log(this.assignments);
    });
  }

}
