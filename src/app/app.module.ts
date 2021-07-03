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
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {HttpClientModule} from '@angular/common/http';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import { VideoPlayerComponent } from './shared/components/video-player/video-player.component';
import { VideojsRecordComponent } from './shared/components/videojs-record/videojs-record.component';
// import {SharedModule} from './shared/shared.module';

import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DATE_FORMATS, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
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
    VideoPlayerComponent,
    VideojsRecordComponent,
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
        }),
        NgxCsvParserModule,
        PdfViewerModule,
        NgxExtendedPdfViewerModule,
        HttpClientModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        
        MatButtonToggleModule,
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatGridListModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatDatepickerModule,
        MatCheckboxModule,
        RouterModule,
        MatGridListModule,
        MatDividerModule,
        FlexLayoutModule,
        MatChipsModule,
        MatTabsModule,
        ToastrModule,
        MatDialogModule,
        NgbModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSelectModule,
        MatSliderModule,
        FormsModule,
        MatSlideToggleModule,
        MatTooltipModule,
        DragDropModule,
        MatRippleModule,
        MatRadioModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
