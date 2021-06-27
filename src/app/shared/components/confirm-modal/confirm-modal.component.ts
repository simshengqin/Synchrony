import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentService} from '../../../core/services/assignment.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent implements OnInit {
  title = 'Confirm Modal';
  description = '';
  feedback = '';
  button = '';
  buttons = [];
  closeResult: string;
  @Output() feedbackEmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() responseEmit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('confirmModal') confirmModal: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private assignmentService: AssignmentService
  ) {}
  open(title: string, description: string, buttons: Array<string>, assignment: Assignment = null) {
    this.title = title;
    this.description = description;
    this.buttons = buttons;
    this.modalService.open(this.confirmModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((response) => {
      if (response === 'delete') {
        this.assignmentService.deleteAssignment(assignment.docId).then(r => {
          console.log(r);
        });
      }
      this.feedbackEmit.emit(this.feedback);
      this.responseEmit.emit(response);
    }, (reason) => {
      this.responseEmit.emit('close');
    });
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit(): void {
  }


}
