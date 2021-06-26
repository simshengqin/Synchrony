import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInstructorComponent } from './home-instructor.component';

describe('HomeInstructorComponent', () => {
  let component: HomeInstructorComponent;
  let fixture: ComponentFixture<HomeInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
