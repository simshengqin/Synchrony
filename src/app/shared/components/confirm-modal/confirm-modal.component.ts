import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Assignment} from '../../../core/models/assignment';
import {AssignmentService} from '../../../core/services/assignment.service';
import {AssignmentSubmission} from '../../../core/models/assignment-submission';
import {AccountService} from '../../../core/services/account.service';
import {Account} from '../../../core/models/account';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})

export class ConfirmModalComponent implements OnInit {
  title = 'Confirm Modal';
  description = '';
  feedback = '';
  buttons = [];
  assignmentSubmission: AssignmentSubmission;
  @Output() feedbackEmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() responseEmit: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('confirmModal') confirmModal: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private assignmentService: AssignmentService,
    private accountService: AccountService,
  ) {}
  open(title: string, description: string, buttons: Array<string>, assignment: Assignment = null, assignmentSubmission: AssignmentSubmission = null, account: Account = null) {
    this.title = title;
    this.description = description;
    this.buttons = buttons;
    this.assignmentSubmission = assignmentSubmission;
    this.modalService.open(this.confirmModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((response) => {
      if (response === 'delete') {
        if (assignment){
          this.assignmentService.deleteAssignment(assignment.docId).then(r => {
            console.log(r);
          });
        }
        if (account){
          this.accountService.deleteAccount(account.docId).then(r => {
            console.log(r);
          });
        }
      }
      if (response === 'submit') {
        this.feedbackEmit.emit(this.feedback);
      }
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
