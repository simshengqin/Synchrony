import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AssignmentService} from '../../../core/services/assignment.service';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {Student} from '../../../core/models/student';
import {StudentService} from '../../../core/services/student.service';
import {ToastrService} from 'ngx-toastr';
// import {pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import {HttpClient} from '@angular/common/http';
import { saveAs } from 'file-saver';
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
  recorded = false;
  // hardcoded instructor_feedback_attachment
  instructorFeedbackAttachmentName = 'Feedback.mp3';
  instructorFeedbackAttachment = 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/assignment_submissions%2FScreenshot_2021-04-11-20-09-37-49_bb71f92a87515742bfe522efc6c7e253%20(1)%20(2).jpg?alt=media&token=cf1ceacd-715d-4286-b2de-78e612bbf889';
  @ViewChild('scoresheet') scoresheet: ElementRef;
  constructor(
    private router: Router,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private assignmentService: AssignmentService,
    private studentService: StudentService,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
  ) {

  }
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
    // this.scoresheet.nativeElement.click();

    // tslint:disable-next-line:max-line-length
    // this.httpClient.get('https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/assignment_submissions%2FExercises%20for%20Binary%20Trees%20(Answer%20Key).pdf', {responseType: 'blob', headers: {Accept: 'application/pdf'}})
    //   .subscribe(blob => {
    //     saveAs(blob, 'download.pdf');
    //   });

    // this.srcObj = { url: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf',
    //   withCredentials: true
    // };
    // tslint:disable-next-line:max-line-length
    // this.pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/assignment_submissions%2FExercises%20for%20Binary%20Trees%20(Answer%20Key).pdf?alt=media&token=6baeba04-90b0-45e6-8bbb-2e6b90c54abf';
    // tslint:disable-next-line:max-line-length
    // this.pdfUrl = 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/assignment_submissions%2FExercises%20for%20Binary%20Trees%20(Answer%20Key).pdf?alt=media&token=e074eec1-85f5-4898-b057-734cfb405a2d';
    // this.pdfUrl = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    // this.pdfUrl = 'gs://synchrony-8287c.appspot.com/assignment_submissions/Exercises for Binary Trees (Answer Key).pdf';
    // console.log(this.pdfUrl);
    // this.downloadFile();
  }
  // public downloadFile(): void {
  //   // let url = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  //   let url = 'https://firebasestorage.googleapis.com/v0/b/synchrony-8287c.appspot.com/o/assignment_submissions%2FExercises%20for%20Binary%20Trees%20(Answer%20Key).pdf?';
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = (event) => {
  //     /* Create a new Blob object using the response
  //     *  data of the onload object.
  //     */
  //     const blob = new Blob([xhr.response], { type: 'image/jpg' });
  //     const a: any = document.createElement('a');
  //     a.style = 'display: none';
  //     document.body.appendChild(a);
  //     url = window.URL.createObjectURL(blob);
  //     a.href = url;
  //     a.download = 'aaa.pdf';
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   };
  //   xhr.open('GET', url);
  //   xhr.send();
  // }
  onCloseModal(response: string) {
    console.log(response);
    if (response === 'discard') {
      this.isRecording = true;
      this.recorded = false;
    }
  }
  onFeedback(feedback: string) {
    this.assignmentSubmission.instructor_feedback_attachment_name = this.instructorFeedbackAttachmentName;
    this.assignmentSubmission.instructor_feedback_attachment = this.instructorFeedbackAttachment;
    this.assignmentSubmission.feedback = feedback;
    this.assignmentSubmission.feedback_datetime = Date.now();
    this.assignmentSubmissionService.updateAssignmentSubmission(this.assignmentSubmission.docId, this.assignmentSubmission)
      .then(r => console.log(r));
    this.toastrService.success('Added feedback successfully!', '', {positionClass: 'toast-top-center'});
    this.router.navigate(['assignment/mark']);
    console.log(this.assignmentSubmission);
  }
  onRecordClick() {
    if (this.recorded) {
      this.confirmModalComponent.open
      ('Mark Assignment', 'Are you sure you want to record again? This will delete your previous recording.',
        ['close', 'discard'], null, this.assignmentSubmission);
    }
    else {
      this.isRecording = true;
    }
  }
  stopRecording() {
    this.isRecording = false;
    this.recorded = true;
  }

  submitFeedback() {
    this.confirmModalComponent.open
    ('Recording Complete', 'Would you like to submit your feedback?', ['close', 'submit'], null, this.assignmentSubmission);
  }
}
