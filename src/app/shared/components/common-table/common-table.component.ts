import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HomeCategory} from '../../../core/models/home-category';
import {FilterAction} from '../../../core/models/FilterAction';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentService} from '../../../core/services/assignment.service';
import {DateHelper} from '../../helpers/date-helper';
import {InstructorService} from '../../../core/services/instructor.service';
import {first} from 'rxjs/operators';
import {Instructor} from '../../../core/models/instructor';
import {Router} from '@angular/router';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
  assignmentNameColumn = TableColumn.assignment_name;
  assignmentDueDatetimeColumn = TableColumn.assignment_due_datetime;
  assignmentStudentColumn = TableColumn.assignment_student;
  assignmentStatusColumn = TableColumn.assignment_status;
  assignmentFeedbackDatetimeColumn = TableColumn.assignment_feedback_datetime;
  assignmentInstructorColumn = TableColumn.assignment_instructor;
  assignmentSchoolColumn = TableColumn.assignment_school;
  assignmentGroupColumn = TableColumn.assignment_group;
  freelancerUsernameColumn = TableColumn.freelancer_username;
  freelancerSchoolColumn = TableColumn.freelancer_school;
  freelancerGroupColumn = TableColumn.freelancer_group;
  wageCreatedDatetimeColumn = TableColumn.wage_created_datetime;
  wageHoursColumn = TableColumn.wage_hours;
  accountUsernameColumn = TableColumn.account_username;
  actionsColumn = TableColumn.actions;
  assignmentEditAction = TableAction.assignment_edit;
  assignmentDeleteAction = TableAction.assignment_delete;
  assignmentMarkAction = TableAction.assignment_mark;
  assignmentSubmitAction = TableAction.assignment_submit;
  assignmentResubmitAction = TableAction.assignment_resubmit;
  assignmentFeedbackAction = TableAction.assignment_feedback;
  freelancerHoursAction = TableAction.freelancer_hours;
  accountDeleteAction = TableAction.account_delete;
  @Input() tableActions?: Array<TableAction>;
  @Input() tableColumns?: Array<TableColumn>;
  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @Input() assignmentSubmissions: Array<AssignmentSubmission> = [];
  @Input() assignments: Array<Assignment> = [];
  monthDayYearFormat: string;
  fullMonthDayYearFormat: string;
  dateTimeFormat: string;
  constructor(
    private assignmentService: AssignmentService,
    private instructorService: InstructorService,
    private dateHelper: DateHelper,
    private router: Router,
  ) {}
  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.dateHelper.getFormat('monthDayYear'),
      this.dateHelper.getFormat('fullMonthDayYear'),
      this.dateHelper.getFormat('dateTime'),
    ]).then((results) => {
      this.monthDayYearFormat = results[0];
      this.fullMonthDayYearFormat = results[1];
      this.dateTimeFormat = results[2];
    });


  }
  onCloseModal(response: string) {
    console.log(response);
  }

  onDeleteClick(assignment: Assignment) {
    this.confirmModalComponent.open('Delete Assignment', 'Are you sure you want to delete '
      + assignment.name + '?', ['close', 'delete'], assignment);
  }

  onEditClick(assignment: Assignment) {
    this.router.navigate(['assignment/edit'], { queryParams: { assignmentDocId : assignment.docId }});
  }

  onSubmitClick(assignment: Assignment) {
    this.router.navigate(['assignment/submit'], { queryParams: { assignmentDocId : assignment.docId }});
  }
  onMarkClick(assignmentSubmission: AssignmentSubmission) {
    this.router.navigate(['assignment/mark'], { queryParams: { assignmentSubmissionDocId : assignmentSubmission.docId }});
  }

  onRemarkClick(assignmentSubmission: AssignmentSubmission) {
    this.router.navigate(['assignment/mark'], { queryParams: { assignmentSubmissionDocId : assignmentSubmission.docId }});
  }

  onFeedbackInstructorClick(assignmentSubmission: AssignmentSubmission) {
    this.confirmModalComponent.open('View Feedback', assignmentSubmission.feedback, ['ok']);
  }
  onFeedbackStudentClick(assignmentSubmission: AssignmentSubmission) {
    this.router.navigate(['assignment/feedback'], { queryParams: { assignmentSubmissionDocId : assignmentSubmission.docId }});
  }
}
