import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {Router} from '@angular/router';
import {AssignmentService} from '../../../core/services/assignment.service';
import {Assignment} from '../../../core/models/assignment';
import {Instructor} from '../../../core/models/instructor';
import {first} from 'rxjs/operators';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  @Input() assignmentDocId: string;
  assignment: Assignment;
  assignmentDueDateTime: string;
  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @ViewChild('name') name: ElementRef;
  @ViewChild('dueDateTime') dueDateTime: ElementRef;
  @ViewChild('school') school: ElementRef;
  @ViewChild('group') group: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('file') file: ElementRef;
  constructor(
    private router: Router,
    private assignmentService: AssignmentService,
    private afStorage: AngularFireStorage,
  ) {}
  async ngOnInit(): Promise<void> {
    if (this.assignmentDocId) {
      this.assignment = await this.assignmentService.getAssignment(this.assignmentDocId)
        .pipe(first())
        .toPromise();
    }
  }
  async onCloseModal(response: string) {
    if (response === 'discard') {
      this.router.navigate(['assignment/edit']);
    } else if (response === 'ok') {
      if (this.file.nativeElement.files.item(0) != null) {
        const path = 'assignments/' + this.file.nativeElement.files.item(0).name;
        const task = this.afStorage.upload(path, this.file.nativeElement.files.item(0));
        return await task.then(async (result) => {
          return await result.ref.getDownloadURL().then(
            (downloadUrl) => {
              this.setOrUpdateAssignment(downloadUrl);
            });
        });
      }
      else {
        this.setOrUpdateAssignment('');
      }
    }
  }
  setOrUpdateAssignment(downloadUrl) {
    const newOrUpdatedAssignment: Assignment = {
      name: this.name.nativeElement.value,
      dueDatetime: new Date(this.dueDateTime.nativeElement.value).getTime(),
      school: this.school.nativeElement.value,
      group: this.group.nativeElement.value,
      description: this.description.nativeElement.value,
      instructorDocId: localStorage.getItem('activeDocId'),
      createdDatetime: Date.now(),
      instructor_attachment: downloadUrl,
      instructor_attachment_name: this.file.nativeElement.files.item(0) ? this.file.nativeElement.files.item(0).name : ''
    };
    if (this.assignment) {
      this.assignmentService.updateAssignment(this.assignmentDocId, newOrUpdatedAssignment).then(r => console.log('a' + r));
    } else {
      this.assignmentService.setAssignment(newOrUpdatedAssignment).then(r => console.log(r));
    }
    this.router.navigate(['assignment/edit']);
  }

}
