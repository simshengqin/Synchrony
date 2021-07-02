import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentService} from '../../../core/services/assignment.service';

@Component({
  selector: 'app-assignment-feedback-individual',
  templateUrl: './assignment-feedback-individual.component.html',
  styleUrls: ['./assignment-feedback-individual.component.scss']
})
export class AssignmentFeedbackIndividualComponent implements OnInit {
  assignmentSubmission: AssignmentSubmission;
  assignmentSubmissionDocId: string;
  assignment: Assignment;
  constructor(
    private assignmentSubmissionService: AssignmentSubmissionService,
    private assignmentService: AssignmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.assignmentSubmissionDocId = params.assignmentSubmissionDocId;
      this.assignmentSubmission = await this.assignmentSubmissionService.getAssignmentSubmission(this.assignmentSubmissionDocId)
        .pipe(first())
        .toPromise();
      this.assignment = await this.assignmentService.getAssignment(this.assignmentSubmission.assignmentDocId)
        .pipe(first())
        .toPromise();
      console.log(this.assignmentSubmission);
    });

  }
  onGoBackClick() {
    this.router.navigate(['assignment/view']);
  }

}
