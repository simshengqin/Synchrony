import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {ToastrService} from 'ngx-toastr';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {Student} from '../../../core/models/student';
import {Account, Role} from '../../../core/models/account';
import {AccountService} from '../../../core/services/account.service';
import {StudentService} from '../../../core/services/student.service';
import {InstructorService} from '../../../core/services/instructor.service';
import {FreelancerService} from '../../../core/services/freelancer.service';
import {AdminService} from '../../../core/services/admin.service';
import {first} from 'rxjs/operators';

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
    private ngxCsvParser: NgxCsvParser,
    private accountService: AccountService,
    private adminService: AdminService,
    private studentService: StudentService,
    private instructorService: InstructorService,
    private freelancerService: FreelancerService,
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
        .pipe().subscribe(async (result: Array<any>) => {
        console.log('Result', result);
        this.csvRecords = result;
        for (const csvRecord of this.csvRecords) {
          this.accountService.getAccountByUsername(csvRecord.username)
            .subscribe(async (accounts) => {
              const afsi = {
                firstName: csvRecord.firstName,
                lastName: csvRecord.lastName,
                school: csvRecord.school,
                group: csvRecord.group
              };
              if (accounts.length === 0) {
                await this.createAccount(csvRecord, afsi);
              } else {
                await this.updateAccount(csvRecord, afsi, accounts[0]);
              }

            });
        }
        this.toastrService.success('Uploaded data to database successfully!', '', {positionClass: 'toast-top-center'});
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        this.toastrService.error('Incorrect file format!', '', {positionClass: 'toast-top-center'});
      });
    }
    else {
      this.toastrService.error('Please upload a file!', '',{positionClass: 'toast-top-center'});
    }


  }
  async createAccount(csvRecord: any, afsi) {
    let ownerDocId = '';
    if (csvRecord.role === 'admin') {
      await this.adminService.setAdmin(afsi).then(r => ownerDocId = r);
    } else if (csvRecord.role === 'student') {
      await this.studentService.setStudent(afsi).then(r => ownerDocId = r);
    } else if (csvRecord.role === 'instructor') {
      await this.instructorService.setInstructor(afsi).then(r => ownerDocId = r);
    } else if (csvRecord.role === 'freelancer') {
      await this.freelancerService.setFreelancer(afsi).then(r => ownerDocId = r);
    }
    console.log(afsi);
    const account: Account = {
      username: csvRecord.username,
      password: csvRecord.password,
      role: csvRecord.role,
      created_datetime: Date.now(),
      ownerDocId,
    };
    await this.accountService.setAccount(account).then(r => console.log(r));
    console.log('Created for...');
    console.log(csvRecord);
  }
  async updateAccount(csvRecord: any, afsi, account: Account) {
    console.log('Updating for...');
    console.log(csvRecord);
    // CREATE A ALL POWERFUL ADD SERVICE like Filter service
    // switch (account.role) {
    //   case Role.student:
    //
    //
    //     break;
    //   case Role.admin:
    //     this.router.navigate(['home/admin']);
    //     break;
    //
    //   case Role.instructor:
    //     this.router.navigate(['home/instructor']);
    //     break;
    //   case Role.freelancer:
    //     this.router.navigate(['home/instructor']);
    //     break;
    // }
  }
}
