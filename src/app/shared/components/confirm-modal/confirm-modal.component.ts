import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  @Output() response: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('confirmModal') confirmModal: TemplateRef<any>;
  constructor(private modalService: NgbModal) {}
  open(title: string, description: string, buttons: Array<string>) {
    this.title = title;
    this.description = description;
    this.buttons = buttons;
    this.modalService.open(this.confirmModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.feedbackEmit.emit(this.feedback);
      this.response.emit(result);
    }, (reason) => {
      this.response.emit('close');
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
