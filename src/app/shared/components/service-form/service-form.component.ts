import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {Router} from '@angular/router';
import {AssignmentService} from '../../../core/services/assignment.service';
import {Assignment} from '../../../core/models/assignment';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
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
  ngOnInit(): void {
  }
  onCloseModal(response: string) {
    if (response === 'discard') {
      this.router.navigate(['home/instructor']);
    }
    else if (response === 'ok') {
      // Hardcoded instructorId
      const assignment: Assignment = {
        name : this.name.nativeElement.value,
        due_datetime : new Date(this.dueDateTime.nativeElement.value).getTime(),
        school : this.school.nativeElement.value,
        group : this.group.nativeElement.value,
        description : this.description.nativeElement.value,
        instructorId: '9KunUkUy4bjYdhuRrHs8',
        submitted_datetime: -1,
        feedback_datetime: -1,
        created_datetime: Date.now()
      };
      this.assignmentService.setAssignment(assignment).then(r => console.log('a' + r));
      // this.router.navigate(['assignment/edit']);
    }
    console.log(response);
  }

}
