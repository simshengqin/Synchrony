import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmitIndividualComponent } from './assignment-submit-individual.component';

describe('AssignmentSubmitIndividualComponent', () => {
  let component: AssignmentSubmitIndividualComponent;
  let fixture: ComponentFixture<AssignmentSubmitIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentSubmitIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentSubmitIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
