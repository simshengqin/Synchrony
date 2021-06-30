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
import {Freelancer} from '../../../core/models/freelancer';
import {Wage} from '../../../core/models/wage';
import {Account} from '../../../core/models/account';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {
  TableColumn = TableColumn;
  TableAction = TableAction;
  @Input() tableActions?: Array<TableAction>;
  @Input() tableColumns?: Array<TableColumn>;
  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @Input() assignmentSubmissions: Array<AssignmentSubmission> = [];
  @Input() assignments: Array<Assignment> = [];
  @Input() freelancers: Array<Freelancer> = [];
  @Input() wages: Array<Wage> = [];
  @Input() accounts: Array<Account> = [];
  monthDayYearFormat: string;
  fullMonthDayYearFormat: string;
  dateTimeFormat: string;
  monthYearFormat: string;
  dateNow = Date.now();
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
      this.dateHelper.getFormat('monthYear'),
    ]).then((results) => {
      this.monthDayYearFormat = results[0];
      this.fullMonthDayYearFormat = results[1];
      this.dateTimeFormat = results[2];
      this.monthYearFormat = results[3];
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

  onViewHours(freelancer: Freelancer) {
    this.router.navigate(['wages/view'], { queryParams: { freelancerDocId : freelancer.docId }});
  }

  onDeleteClickAccount(account: Account) {
    this.confirmModalComponent.open('Delete Account', 'Are you sure you want to delete '
      + account.username + '?', ['close', 'delete'], null, null, account);
  }
}
