import { Component, OnInit } from '@angular/core';
import {TableAction} from '../../../core/models/TableAction';
import {TableColumn} from '../../../core/models/TableColumn';
import {Instructor} from '../../../core/models/instructor';
import {first} from 'rxjs/operators';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentService} from '../../../core/services/assignment.service';
import {InstructorService} from '../../../core/services/instructor.service';

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
  assignments: Array<Assignment> = [];
  constructor(
    private assignmentService: AssignmentService,
    private instructorService: InstructorService,
  ) { }

  ngOnInit(): void {

    this.assignmentService.getAssignments().subscribe(async (assignments) => {
      this.assignments = assignments;
      for (const assignment of assignments) {
        let instructor: Instructor;
        instructor = await this.instructorService.getInstructor(assignment.instructorId)
          .pipe(first())
          .toPromise();
        assignment.instructor = instructor;
      }
      console.log(this.assignments);
    });
  }

}
