import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {Router} from '@angular/router';
import {AssignmentService} from '../../../core/services/assignment.service';
import {Assignment} from '../../../core/models/assignment';
import {Instructor} from '../../../core/models/instructor';
import {first} from 'rxjs/operators';

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
  constructor(
    private router: Router,
    private assignmentService: AssignmentService,
  ) {}
  async ngOnInit(): Promise<void> {
    if (this.assignmentDocId) {
      this.assignment = await this.assignmentService.getAssignment(this.assignmentDocId)
        .pipe(first())
        .toPromise();
    }
  }
  onCloseModal(response: string) {
    if (response === 'discard') {
      this.router.navigate(['assignment/edit']);
    }
    else if (response === 'ok') {
      // Hardcoded instructorId
      const newOrUpdatedAssignment: Assignment = {
        name : this.name.nativeElement.value,
        dueDatetime : new Date(this.dueDateTime.nativeElement.value).getTime(),
        school : this.school.nativeElement.value,
        group : this.group.nativeElement.value,
        description : this.description.nativeElement.value,
        instructorDocId: '9KunUkUy4bjYdhuRrHs8',
        createdDatetime: Date.now()
      };
      if (this.assignment) {
        this.assignmentService.updateAssignment(this.assignmentDocId, newOrUpdatedAssignment).then(r => console.log('a' + r));
      }
      else {
        this.assignmentService.setAssignment(newOrUpdatedAssignment).then(r => console.log(r));
      }
      this.router.navigate(['assignment/edit']);

    }
    console.log(response);
  }

}
