import {Component, OnInit} from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {Instructor} from '../../../core/models/instructor';
import {first} from 'rxjs/operators';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentService} from '../../../core/services/assignment.service';
import {InstructorService} from '../../../core/services/instructor.service';
import {StudentService} from '../../../core/services/student.service';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {FilterAction} from '../../../core/models/FilterAction';
import {ActivatedRoute} from '@angular/router';
import {FilterService} from '../../../core/services/filter.service';

@Component({
  selector: 'app-assignment-view',
  templateUrl: './assignment-view.component.html',
  styleUrls: ['./assignment-view.component.scss']
})
export class AssignmentViewComponent implements OnInit {
  tableActions?: Array<TableAction> = [TableAction.assignment_submit, TableAction.assignment_resubmit, TableAction.assignment_feedback];
  showOngoing = true;
  tableColumns?: Array<TableColumn> = [TableColumn.assignment_name,
    TableColumn.assignment_status, TableColumn.assignment_due_datetime,
    TableColumn.assignment_instructor, TableColumn.actions];
  filterActions?: Array<FilterAction> = [FilterAction.assignment_completion_status];
  assignments: Array<Assignment> = [];
  constructor(
    private studentService: StudentService,
    private assignmentService: AssignmentService,
    private instructorService: InstructorService,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
  ) { }

  async ngOnInit(): Promise<void> {
    const student = await this.studentService.getStudent(localStorage.getItem('activeDocId'))
      .pipe(first())
      .toPromise();
    console.log(student);
    this.activatedRoute.queryParams.subscribe(async params => {
      const school = student.school;
      const group = student.group;
      const assignmentCompletionStatus = params.assignment_completion_status ? params.assignment_completion_status : '';
      this.filterService.get('assignments',
        'school', '==', school,
        'group', '==', group).subscribe(async (assignments) => {
          let filteredAssignments = [];
          for (let i = 0; i < assignments.length; i++) {
            const assignment = assignments[i];
            console.log(assignment.dueDatetime, Date.now(), Date.now() > assignment.dueDatetime);
            if (assignmentCompletionStatus === '' ||
              assignmentCompletionStatus === 'Ongoing' && Date.now() <= assignment.dueDatetime ||
              assignmentCompletionStatus === 'Completed' && Date.now() > assignment.dueDatetime) {
              const instructor = await this.instructorService.getInstructor(assignment.instructorDocId)
                .pipe(first())
                .toPromise();
              assignment.instructor = instructor;
              this.assignmentSubmissionService.getAssignmentSubmissionsByStudentAndAssignment(
                localStorage.getItem('activeDocId'), assignment.docId)
                .subscribe(async (assignmentSubmissions) => {
                  assignment.assignmentSubmission = assignmentSubmissions[assignmentSubmissions.length - 1];
                });
              filteredAssignments.push(assignment);
            }

            this.assignments = filteredAssignments;
          }
      });
    });
    // this.assignmentService.getAssignmentsBySchoolAndGroup(student.school, student.group).subscribe(async (assignments) => {
    //   this.assignments = assignments;
    //   for (const assignment of assignments) {
    //     let instructor: Instructor;
    //     instructor = await this.instructorService.getInstructor(assignment.instructorDocId)
    //       .pipe(first())
    //       .toPromise();
    //     assignment.instructor = instructor;
    //
    //     this.assignmentSubmissionService.getAssignmentSubmissionsByStudentAndAssignment(
    //       localStorage.getItem('activeDocId'), assignment.docId)
    //       .subscribe(async (assignmentSubmissions) => {
    //         assignment.assignmentSubmission = assignmentSubmissions[assignmentSubmissions.length - 1];
    //       });
    //   }
    console.log(this.assignments);
  }

}
