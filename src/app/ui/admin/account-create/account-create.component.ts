import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  constructor() {}
  ngOnInit(): void {
  }
  onCloseModal(response: string) {
    console.log(response);
  }
  uploadFile() {
    const isUploadSuccess = true;
    if (isUploadSuccess) {
      this.confirmModalComponent.open
      ('Upload Success', 'Successfully uploaded file and modified accounts data!', ['ok']);
    }
    else {
      this.confirmModalComponent.open
      ('Invalid File Format', 'Please ensure that the columns follows the specified format', ['ok']);
    }

  }
}
