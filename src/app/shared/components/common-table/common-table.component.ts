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
  // firebaseget
  assignments: Array<Assignment> = [];
  monthDayYearFormat: string;
  fullMonthDayYearFormat: string;
  dateTimeFormat: string;
  constructor(
    private assignmentService: AssignmentService,
    private instructorService: InstructorService,
    private dateHelper: DateHelper,
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
    this.assignmentService.getAssignments().subscribe(async (assignments) => {
      this.assignments = assignments;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.assignments.length; i++) {
        let instructor: Instructor;
        instructor = await this.instructorService.getInstructor(this.assignments[i].instructorId)
          .pipe(first())
          .toPromise();
        this.assignments[i].instructor = instructor;
      }
      console.log(this.assignments);
    });


  }
  onCloseModal(response: string) {
    console.log(response);
  }

  arrayContains(assignmentName: string) {
    const tableColumn = TableColumn.assignment_name;
    return this.tableColumns.includes(tableColumn);

  }
}
