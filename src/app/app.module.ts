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
import { LoginModalComponent } from './ui/home/login-modal/login-modal.component';
import { SignupModalComponent } from './ui/home/signup-modal/signup-modal.component';
import { UploadedViewComponent } from './shared/components/uploaded-view/uploaded-view.component';
import { DropzoneComponent } from './shared/components/dropzone/dropzone.component';
import { ServiceFormComponent } from './shared/components/service-form/service-form.component';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';

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
    LoginModalComponent,
    SignupModalComponent,
    UploadedViewComponent,
    DropzoneComponent,
    ServiceFormComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
