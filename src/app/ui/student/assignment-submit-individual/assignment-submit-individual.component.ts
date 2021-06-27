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
  @ViewChild('file') file: ElementRef;
  // progress: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private assignmentSubmissionService: AssignmentSubmissionService,
    private router: Router,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(async params => {
      this.assignmentDocId = params.assignmentDocId;
      this.assignment = await this.assignmentService.getAssignment(this.assignmentDocId)
        .pipe(first())
        .toPromise();
      // Hardcoded studentDocId
      this.assignmentSubmissionService.getAssignmentSubmissionsByStudentAndAssignment('TiMPk1PgPWhztZnb5HHp', this.assignmentDocId)
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
    const path = 'assignment_submissions/' + this.file.nativeElement.files.item(0).name;
    console.log(this.file.nativeElement.files.item(0));
    const task = this.afStorage.upload(path, this.file.nativeElement.files.item(0));
    return await task.then(async (result) => {
      return await result.ref.getDownloadURL().then(
        (downloadUrl) => {
          console.log(downloadUrl);
          const newAssignmentSubmission: AssignmentSubmission = {
            student_attachment: downloadUrl,
            student_attachment_name: this.file.nativeElement.files.item(0).name,
            submitted_datetime: Date.now(),
            assignmentDocId: this.assignmentDocId,
            studentDocId: 'TiMPk1PgPWhztZnb5HHp',
            instructorDocId: this.assignment.instructorDocId,
            school: this.assignment.school,
            group: this.assignment.group,
            feedback: '',
            feedback_datetime: -1
          };
          if (this.assignmentSubmission) {
            this.assignmentSubmissionService.updateAssignmentSubmission(this.assignmentSubmission.docId, newAssignmentSubmission)
              .then(r => console.log('a' + r));
          } else {
            this.assignmentSubmissionService.setAssignmentSubmission(newAssignmentSubmission).then(r =>
            {console.log(r); });
          }
          this.confirmModalComponent.open('Submit Assignment', 'Submitted assignment successfully!', ['ok']);


        });
    });
  }
onCloseModal(response: string) {
    if (response === 'ok') {
      this.router.navigate(['assignment/view']);
    }

  }

}
