import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ExploreCategoriesComponent} from './shared/components/explore-categories/explore-categories.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeInstructorComponent } from './ui/home-instructor/home-instructor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ExploreCategoriesComponent,
    HomeInstructorComponent
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
