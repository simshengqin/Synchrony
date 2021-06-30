import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ToastrService} from 'ngx-toastr';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @ViewChild('file') file: ElementRef;
  csvRecords: any[] = [];
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  constructor(
    private toastrService: ToastrService,
    private ngxCsvParser: NgxCsvParser
  ) {}
  ngOnInit(): void {
  }
  onCloseModal(response: string) {
    console.log(response);
  }
  uploadFile() {
    if (this.file.nativeElement.files.item(0)) {
      // Parse the file you want to select for the operation along with the configuration
      this.ngxCsvParser.parse(this.file.nativeElement.files.item(0), { header: true, delimiter: ',' })
        .pipe().subscribe((result: Array<any>) => {

        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
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
