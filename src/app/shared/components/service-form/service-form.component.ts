import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  constructor() {}
  ngOnInit(): void {
  }
  onCloseModal(response: string) {
    console.log(response);
  }

}
