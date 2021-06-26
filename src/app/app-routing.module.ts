import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeInstructorComponent} from './ui/home-instructor/home-instructor.component';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: '**',
      pathMatch: 'full',
      component: HomeInstructorComponent
    }
  ]
}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
