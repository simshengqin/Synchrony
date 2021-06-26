import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentFeedbackIndividualComponent } from './assignment-feedback-individual.component';

describe('AssignmentFeedbackIndividualComponent', () => {
  let component: AssignmentFeedbackIndividualComponent;
  let fixture: ComponentFixture<AssignmentFeedbackIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentFeedbackIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentFeedbackIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
