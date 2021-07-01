import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Assignment} from '../../../core/models/assignment';
import {first} from 'rxjs/operators';
import {AssignmentService} from '../../../core/services/assignment.service';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {Instructor} from '../../../core/models/instructor';
import {InstructorService} from '../../../core/services/instructor.service';
import {StudentService} from '../../../core/services/student.service';
import {Student} from '../../../core/models/student';
import {AssignmentSubmissionService} from '../../../core/services/assignment-submission.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-assignment-submit-individual',
  templateUrl: './assignment-submit-individual.component.html',
  styleUrls: ['./assignment-submit-individual.component.scss']
})
export class AssignmentSubmitIndividualComponent implements OnInit {
  assignmentDocId: string;
  assignment: Assignment;
  assignmentSubmission: AssignmentSubmission;
  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @ViewChild('scoresheetFile') scoresheetFile: ElementRef;
  @ViewChild('recordingFile') recordingFile: ElementRef;
  // progress: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private router: Router,
    private afStorage: AngularFireStorage,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.assignmentDocId = params.assignmentDocId;
      this.assignment = await this.assignmentService.getAssignment(this.assignmentDocId)
        .pipe(first())
        .toPromise();
      this.assignmentSubmissionService.getAssignmentSubmissionsByStudentAndAssignment(
        localStorage.getItem('activeDocId'), this.assignmentDocId)
        .subscribe(async (assignmentSubmissions) => {
        this.assignmentSubmission = assignmentSubmissions[assignmentSubmissions.length - 1];
        console.log(this.assignmentSubmission);
      });
    });

  }
  onGoBackClick(assignment: Assignment) {
    this.router.navigate(['assignment/view']);
  }
  async onSubmitClick() {
    if (!this.scoresheetFile.nativeElement.files.item(0) && !this.recordingFile.nativeElement.files.item(0)) {
      this.toastrService.error('Please upload a file!', '',{positionClass: 'toast-top-center'});
    }
    else {
      if (this.scoresheetFile.nativeElement.files.item(0)) { await this.uploadFile(this.scoresheetFile, 'scoresheet'); }
      if (this.recordingFile.nativeElement.files.item(0)) { await this.uploadFile(this.recordingFile, 'recording'); }
      this.router.navigate(['assignment/view']);
    }
  }
  async uploadFile(file, type) {
    const path = 'assignment_submissions/' + file.nativeElement.files.item(0).name;
    console.log(file.nativeElement.files.item(0));
    const task = this.afStorage.upload(path, file.nativeElement.files.item(0));
    await task.then(async (result) => {
      await result.ref.getDownloadURL().then(
        (downloadUrl) => {
          console.log(downloadUrl);
          let newAssignmentSubmission: AssignmentSubmission;
          if (type === 'scoresheet') {
             newAssignmentSubmission  = {
              student_attachment_scoresheet: downloadUrl,
              student_attachment_scoresheet_name: file.nativeElement.files.item(0).name,
              submitted_datetime: Date.now(),
              assignmentDocId: this.assignmentDocId,
              studentDocId: localStorage.getItem('activeDocId'),
              instructorDocId: this.assignment.instructorDocId,
              school: this.assignment.school,
              group: this.assignment.group,
              feedback: '',
              feedback_datetime: -1
            };
          }
          else if (type === 'recording') {
            newAssignmentSubmission  = {
              student_attachment_recording: downloadUrl,
              student_attachment_recording_name: file.nativeElement.files.item(0).name,
              submitted_datetime: Date.now(),
              assignmentDocId: this.assignmentDocId,
              studentDocId: localStorage.getItem('activeDocId'),
              instructorDocId: this.assignment.instructorDocId,
              school: this.assignment.school,
              group: this.assignment.group,
              feedback: '',
              feedback_datetime: -1
            };
          }

          if (this.assignmentSubmission) {
            this.assignmentSubmissionService.updateAssignmentSubmission(this.assignmentSubmission.docId, newAssignmentSubmission)
              .then(r => {
                this.toastrService.success('Updated ' + type + ' successfully!', '', {positionClass: 'toast-top-center'});
              });
          } else {
            this.assignmentSubmissionService.setAssignmentSubmission(newAssignmentSubmission).then(r => {
              this.toastrService.success('Uploaded ' + type + ' successfully!', '', {positionClass: 'toast-top-center'});
            });
          }
        });
    });
  }


}
