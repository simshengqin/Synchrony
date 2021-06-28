import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstructorHomeComponent} from './ui/instructor/instructor-home/instructor-home.component';
import {AssignmentNewComponent} from './ui/instructor/assignment-new/assignment-new.component';
import {AssignmentEditComponent} from './ui/instructor/assignment-edit/assignment-edit.component';
import {AssignmentEditIndividualComponent} from './ui/instructor/assignment-edit-individual/assignment-edit-individual.component';
import {AssignmentMarkComponent} from './ui/instructor/assignment-mark/assignment-mark.component';
import {AssignmentMarkIndividualComponent} from './ui/instructor/assignment-mark-individual/assignment-mark-individual.component';
import {AssignmentViewComponent} from './ui/student/assignment-view/assignment-view.component';
import {AssignmentSubmitIndividualComponent} from './ui/student/assignment-submit-individual/assignment-submit-individual.component';
import {AssignmentFeedbackIndividualComponent} from './ui/student/assignment-feedback-individual/assignment-feedback-individual.component';
import {AdminHomeComponent} from './ui/admin/admin-home/admin-home.component';
import {WagesViewComponent} from './ui/admin/wages-view/wages-view.component';
import {WagesViewIndividualComponent} from './ui/admin/wages-view-individual/wages-view-individual.component';
import {AccountCreateComponent} from './ui/admin/account-create/account-create.component';
import {AccountDeleteComponent} from './ui/admin/account-delete/account-delete.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'home/instructor',
      pathMatch: 'full',
      component: InstructorHomeComponent
    },
    {
      path: 'assignment/new',
      pathMatch: 'full',
      component: AssignmentNewComponent
    },
    {
      path: 'assignment/edit',
      pathMatch: 'full',
      component: AssignmentEditComponent
    },
    {
      path: 'assignment/mark',
      pathMatch: 'full',
      component: AssignmentMarkComponent
    },

    {
      path: 'assignment/view',
      pathMatch: 'full',
      component: AssignmentViewComponent
    },
    {
      path: 'assignment/submit',
      pathMatch: 'full',
      component: AssignmentSubmitIndividualComponent
    },
    {
      path: 'assignment/feedback',
      pathMatch: 'full',
      component: AssignmentFeedbackIndividualComponent
    },
    {
      path: 'home/admin',
      pathMatch: 'full',
      component: AdminHomeComponent
    },
    {
      path: 'wages/view',
      pathMatch: 'full',
      component: WagesViewComponent
    },
    {
      path: 'account/create',
      pathMatch: 'full',
      component: AccountCreateComponent
    },
    {
      path: 'account/delete',
      pathMatch: 'full',
      component: AccountDeleteComponent
    },

    {
      path: '**',
      pathMatch: 'full',
      component: InstructorHomeComponent
    },


  ]
}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
