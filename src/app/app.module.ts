import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ExploreCategoriesComponent} from './shared/components/explore-categories/explore-categories.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { InstructorHomeComponent } from './ui/instructor/instructor-home/instructor-home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonTableComponent} from './shared/components/common-table/common-table.component';
import {SearchFilterComponent} from './shared/components/search-filter/search-filter.component';
import { AssignmentNewComponent } from './ui/instructor/assignment-new/assignment-new.component';
import { AssignmentEditComponent } from './ui/instructor/assignment-edit/assignment-edit.component';
import { AssignmentEditIndividualComponent } from './ui/instructor/assignment-edit-individual/assignment-edit-individual.component';
import { AssignmentMarkComponent } from './ui/instructor/assignment-mark/assignment-mark.component';
import { AssignmentMarkIndividualComponent } from './ui/instructor/assignment-mark-individual/assignment-mark-individual.component';
import { AssignmentViewComponent } from './ui/student/assignment-view/assignment-view.component';
import { AssignmentSubmitIndividualComponent } from './ui/student/assignment-submit-individual/assignment-submit-individual.component';
import { AssignmentFeedbackIndividualComponent } from './ui/student/assignment-feedback-individual/assignment-feedback-individual.component';
import { AdminHomeComponent } from './ui/admin/admin-home/admin-home.component';
import { WagesViewComponent } from './ui/admin/wages-view/wages-view.component';
import { WagesViewIndividualComponent } from './ui/admin/wages-view-individual/wages-view-individual.component';
import { AccountCreateComponent } from './ui/admin/account-create/account-create.component';
import { AccountDeleteComponent } from './ui/admin/account-delete/account-delete.component';
import { LoginComponent } from './ui/home/login/login.component';
import {SignupComponent} from './ui/home/signup/signup.component';
import { UploadedViewComponent } from './shared/components/uploaded-view/uploaded-view.component';
import { DropzoneComponent } from './shared/components/dropzone/dropzone.component';
import { ServiceFormComponent } from './shared/components/service-form/service-form.component';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { HeaderComponent } from './shared/components/header/header.component';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
// import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ExploreCategoriesComponent,
    InstructorHomeComponent,
    CommonTableComponent,
    SearchFilterComponent,
    AssignmentNewComponent,
    AssignmentEditComponent,
    AssignmentEditIndividualComponent,
    AssignmentMarkComponent,
    AssignmentMarkIndividualComponent,
    AssignmentViewComponent,
    AssignmentSubmitIndividualComponent,
    AssignmentFeedbackIndividualComponent,
    AdminHomeComponent,
    WagesViewComponent,
    WagesViewIndividualComponent,
    AccountCreateComponent,
    AccountDeleteComponent,
    LoginComponent,
    SignupComponent,
    UploadedViewComponent,
    DropzoneComponent,
    ServiceFormComponent,
    ConfirmModalComponent,
    HeaderComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        NgbModule,
        FormsModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        CommonModule,
        // SharedModule,
        BrowserModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
          timeOut: 2500,
          positionClass: 'toast-top-center',
          preventDuplicates: true,
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
