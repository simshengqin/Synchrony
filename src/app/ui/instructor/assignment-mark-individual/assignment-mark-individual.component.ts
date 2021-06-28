import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AssignmentService} from '../../../core/services/assignment.service';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {Student} from '../../../core/models/student';
import {StudentService} from '../../../core/services/student.service';

@Component({
  selector: 'app-assignment-mark-individual',
  templateUrl: './assignment-mark-individual.component.html',
  styleUrls: ['./assignment-mark-individual.component.scss']
})
export class AssignmentMarkIndividualComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @Input() assignmentSubmissionDocId: string;
  assignmentSubmission: AssignmentSubmission;
  assignment: Assignment;
  student: Student;
  isRecording = false;
  constructor(
    private router: Router,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private assignmentService: AssignmentService,
    private studentService: StudentService,
  ) {}
  async ngOnInit(): Promise<void> {
    this.assignmentSubmission = await this.assignmentSubmissionService.getAssignmentSubmission(this.assignmentSubmissionDocId)
      .pipe(first())
      .toPromise();
    this.assignment = await this.assignmentService.getAssignment(this.assignmentSubmission.assignmentDocId)
      .pipe(first())
      .toPromise();
    this.student = await this.studentService.getStudent(this.assignmentSubmission.studentDocId)
      .pipe(first())
      .toPromise();
  }
  onCloseModal(response: string) {
    console.log(response);
  }
  onFeedback(feedback: string) {
    // hardcoded instructor_feedback_attachment
    this.assignmentSubmission.instructor_feedback_attachment_name = 'Feedback.mp3';
    this.assignmentSubmission.instructor_feedback_attachment = 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/assignment_submissions%2FScreenshot_2021-04-11-20-09-37-49_bb71f92a87515742bfe522efc6c7e253%20(1)%20(2).jpg?alt=media&token=cf1ceacd-715d-4286-b2de-78e612bbf889';
    this.assignmentSubmission.feedback = feedback;
    this.assignmentSubmission.feedback_datetime = Date.now();
    this.assignmentSubmissionService.updateAssignmentSubmission(this.assignmentSubmission.docId, this.assignmentSubmission)
      .then(r => console.log(r));
    this.router.navigate(['assignment/mark']);
    console.log(this.assignmentSubmission);
  }

  startRecording() {
    this.isRecording = true;
  }

  stopRecording() {
    this.confirmModalComponent.open
    ('Recording Complete', 'Would you like to submit your feedback?', ['delete', 'submit'], null, this.assignmentSubmission);
  }
}
