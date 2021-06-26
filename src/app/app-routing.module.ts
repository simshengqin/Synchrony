import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstructorHomeComponent} from './ui/instructor/instructor-home/instructor-home.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: '**',
      pathMatch: 'full',
      component: InstructorHomeComponent
    }
  ]
}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
