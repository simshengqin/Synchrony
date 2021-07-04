import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
import {Account, Role} from '../../../core/models/account';
import {Student} from '../../../core/models/student';
import {AccountService} from '../../../core/services/account.service';
import {AssignmentService} from '../../../core/services/assignment.service';
import {StudentService} from '../../../core/services/student.service';
import {InstructorService} from '../../../core/services/instructor.service';
import {FreelancerService} from '../../../core/services/freelancer.service';
import {Instructor} from '../../../core/models/instructor';
import {Freelancer} from '../../../core/models/freelancer';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('role') role: ElementRef;
  @ViewChild('school') school: ElementRef;
  @ViewChild('group') group: ElementRef;
  constructor(
    private assignmentService: AssignmentService,
    private accountService: AccountService,
    private studentService: StudentService,
    private instructorService: InstructorService,
    private freelancerService: FreelancerService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  async signUp() {
    if (this.username.nativeElement.value === '' || this.password.nativeElement.value === '' || this.firstName.nativeElement.value === '' ||
      this.lastName.nativeElement.value === '' || this.role.nativeElement.value === 'Select Role' ||
      this.school.nativeElement.value === 'Select School' || this.group.nativeElement.value === 'Select Group'){
      this.toastrService.error('Please fill up all fields!', '', {positionClass: 'toast-top-center'});
    }
    else {
      let ownerDocId = '';
      if (this.role.nativeElement.value === 'Student') {
        const student: Student = {
          firstName: this.firstName.nativeElement.value,
          lastName: this.lastName.nativeElement.value,
          school: this.school.nativeElement.value,
          group: this.group.nativeElement.value
        };
        await this.studentService.setStudent(student).then(r => ownerDocId = r);
      } else if (this.role.nativeElement.value === 'Instructor') {
        const instructor: Instructor = {
          firstName: this.firstName.nativeElement.value,
          lastName: this.lastName.nativeElement.value,
          school: this.school.nativeElement.value,
          group: this.group.nativeElement.value
        };
        await this.instructorService.setInstructor(instructor).then(r => ownerDocId = r);
      } else if (this.role.nativeElement.value === 'Freelancer') {
        const freelancer: Freelancer = {
          firstName: this.firstName.nativeElement.value,
          lastName: this.lastName.nativeElement.value,
          school: this.school.nativeElement.value,
          group: this.group.nativeElement.value
        };
        await this.freelancerService.setFreelancer(freelancer).then(r => ownerDocId = r);
      }
      console.log(ownerDocId);
      const account: Account = {
        username: this.username.nativeElement.value,
        password: this.password.nativeElement.value,
        role: this.role.nativeElement.value,
        created_datetime: Date.now(),
        ownerDocId,
      };
      this.accountService.setAccount(account).then(r => console.log(r));
      this.toastrService.success('Account created successfully!', '', {positionClass: 'toast-top-center'});
      this.goLoginPage();
    }

  }
  async onCloseModal(response: string) {

  }
  goLoginPage() {
    this.router.navigate(['login']);
  }
}


