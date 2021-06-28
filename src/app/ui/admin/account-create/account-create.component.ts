import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @ViewChild('file') file: ElementRef;
  constructor(
    private toastrService: ToastrService,
  ) {}
  ngOnInit(): void {
  }
  onCloseModal(response: string) {
    console.log(response);
  }
  uploadFile() {
    if (this.file.nativeElement.files.item(0)) {
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
    else {
      this.toastrService.error('Please upload a file!', '',{positionClass: 'toast-top-center'});
    }


  }
}
