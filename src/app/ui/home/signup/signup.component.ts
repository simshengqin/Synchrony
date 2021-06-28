// import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {ConfirmModalComponent} from '../../../shared/components/confirm-modal/confirm-modal.component';
// import {Account} from '../../../core/models/account';
// import {Student} from '../../../core/models/student';
//
// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss']
// })
// export class SignupComponent implements OnInit {
//   @ViewChild(ConfirmModalComponent) confirmModalComponent: ConfirmModalComponent;
//   @ViewChild('username') username: ElementRef;
//   @ViewChild('password') password: ElementRef;
//   @ViewChild('role') role: ElementRef;
//   @ViewChild('school') school: ElementRef;
//   @ViewChild('group') group: ElementRef;
//   constructor() {
//   }
//
//   ngOnInit(): void {
//   }
//
//   createAccount() {
//     if (this.role.nativeElement.value === 'Student') {
//       const student: Student = {
//         name: this.name.nativeElement.value,
//       };
//     }
//     const account: Account = {
//       name: this.name.nativeElement.value,
//     };
//     if (this.assignment) {
//       this.assignmentService.updateAssignment(this.assignmentDocId, newOrUpdatedAssignment).then(r => console.log('a' + r));
//     } else {
//       this.assignmentService.setAssignment(newOrUpdatedAssignment).then(r => console.log(r));
//     }
//     this.confirmModalComponent.open('Create Account', 'Account created successfully!', ['ok']);
//   }
// }
//
//
