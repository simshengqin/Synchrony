import {Component, OnInit, ViewChild} from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {FilterAction} from '../../../core/models/FilterAction';
import {AssignmentService} from '../../../core/services/assignment.service';
import {StudentService} from '../../../core/services/student.service';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {ActivatedRoute} from '@angular/router';
import {FilterService} from '../../../core/services/filter.service';
import {CommonTableComponent} from '../../../shared/components/common-table/common-table.component';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-assignment-mark',
  templateUrl: './assignment-mark.component.html',
  styleUrls: ['./assignment-mark.component.scss']
})
export class AssignmentMarkComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.assignment_mark, TableAction.assignment_instructor_feedback];
  tableColumns?: Array<TableColumn> = [ TableColumn.position, TableColumn.assignment_name2,
    TableColumn.assignment_school, TableColumn.assignment_group, TableColumn.assignment_student_name,
    TableColumn.assignment_submission_status, TableColumn.assignment_feedback_datetime, TableColumn.actions];
  // tableColumns?: Array<TableColumn> = [TableColumn.position, TableColumn.assignment_submission_assignment_name,
  //   TableColumn.assignment_submission_student_name, TableColumn.assignment_submission_submission_status,
  // TableColumn.assignment_submission_due_datetime, TableColumn.assignment_submission_feedback_datetime, TableColumn.actions];
  // , TableColumn.assignment_student, TableColumn.assignment_status
  //   , TableColumn.assignment_due_datetime, TableColumn.assignment_feedback_datetime, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.assignment_school, FilterAction.assignment_group, FilterAction.assignment_feedback];
  assignmentSubmissions: Array<AssignmentSubmission>;
  instructorDocId = localStorage.getItem('activeDocId');
  assignmentSubmissionDocId: string;
  @ViewChild(CommonTableComponent) commonTableComponent: CommonTableComponent;
  constructor(
    private assignmentService: AssignmentService,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.assignmentSubmissionDocId = params.assignmentSubmissionDocId;
    // });
    // this.assignmentSubmissionService.getAssignmentSubmissionsByInstructor(this.instructorId).subscribe(async (assignmentSubmissions) => {
    //   for (const assignmentSubmission of assignmentSubmissions) {
    //     assignmentSubmission.student = await this.studentService.getStudent(assignmentSubmission.studentDocId)
    //       .pipe(first())
    //       .toPromise();
    //     assignmentSubmission.assignment = await this.assignmentService.getAssignment(assignmentSubmission.assignmentDocId)
    //       .pipe(first())
    //       .toPromise();
    //   }
    //   this.assignmentSubmissions = assignmentSubmissions;
    //   console.log(this.assignmentSubmissions);
    // });
    this.activatedRoute.queryParams.subscribe(async params => {
      this.assignmentSubmissionDocId = params.assignmentSubmissionDocId;
      const school = params.assignment_school ? params.assignment_school : '';
      const group = params.assignment_group ? params.assignment_group : '';
      const assignmentFeedback = params.assignment_feedback ? params.assignment_feedback : '';
      const filterOp4 = assignmentFeedback === 'With Feedback' ? '!=' : '==';
      const filterVal4 = assignmentFeedback === '' ? '' : -1;
      console.log(school + ',' + group + ',' + assignmentFeedback + ',');
      this.filterService.get('assignment_submissions', 'instructorDocId', '==', this.instructorDocId,
        'school', '==', school,
        'group', '==', group,
        'feedback_datetime', filterOp4, filterVal4).subscribe(async (assignmentSubmissions) => {
        for (const assignmentSubmission of assignmentSubmissions) {
          assignmentSubmission.student = await this.studentService.getStudent(assignmentSubmission.studentDocId)
            .pipe(first())
            .toPromise();
          assignmentSubmission.student_name = assignmentSubmission.student.firstName + ' ' +
            assignmentSubmission.student.lastName;
          assignmentSubmission.assignment = await this.assignmentService.getAssignment(assignmentSubmission.assignmentDocId)
            .pipe(first())
            .toPromise();
          assignmentSubmission.assignment_name = assignmentSubmission.assignment.name;
        }
        this.assignmentSubmissions = assignmentSubmissions;
        this.commonTableComponent.loadTableData(this.assignmentSubmissions);
      });
    });
  }

}
