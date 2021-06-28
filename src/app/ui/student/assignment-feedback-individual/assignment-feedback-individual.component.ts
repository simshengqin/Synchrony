import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../../../core/models/assignment';

@Component({
  selector: 'app-assignment-feedback-individual',
  templateUrl: './assignment-feedback-individual.component.html',
  styleUrls: ['./assignment-feedback-individual.component.scss']
})
export class AssignmentFeedbackIndividualComponent implements OnInit {
  assignmentSubmission: AssignmentSubmission;
  assignmentSubmissionDocId: string;
  constructor(
    private assignmentSubmissionService: AssignmentSubmissionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.assignmentSubmissionDocId = params.assignmentSubmissionDocId;
      this.assignmentSubmission = await this.assignmentSubmissionService.getAssignmentSubmission(this.assignmentSubmissionDocId)
        .pipe(first())
        .toPromise();
    });

  }
  onGoBackClick() {
    this.router.navigate(['assignment/view']);
  }

}
