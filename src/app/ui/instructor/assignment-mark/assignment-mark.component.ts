import {Component, OnInit} from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {first} from 'rxjs/operators';
import {AssignmentService} from '../../../core/services/assignment.service';
import {StudentService} from '../../../core/services/student.service';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {ActivatedRoute} from '@angular/router';

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
  assignmentSubmissions: Array<AssignmentSubmission>;
  instructorId = localStorage.getItem('activeDocId');
  assignmentSubmissionDocId: string;
  constructor(
    private assignmentService: AssignmentService,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.assignmentSubmissionDocId = params.assignmentSubmissionDocId;
    });
    this.assignmentSubmissionService.getAssignmentSubmissionsByInstructor(this.instructorId).subscribe(async (assignmentSubmissions) => {
      for (const assignmentSubmission of assignmentSubmissions) {
        assignmentSubmission.student = await this.studentService.getStudent(assignmentSubmission.studentDocId)
          .pipe(first())
          .toPromise();
        assignmentSubmission.assignment = await this.assignmentService.getAssignment(assignmentSubmission.assignmentDocId)
          .pipe(first())
          .toPromise();
      }
      this.assignmentSubmissions = assignmentSubmissions;
      console.log(this.assignmentSubmissions);
    });
  }

}
