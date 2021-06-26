import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentMarkIndividualComponent } from './assignment-mark-individual.component';

describe('AssignmentMarkIndividualComponent', () => {
  let component: AssignmentMarkIndividualComponent;
  let fixture: ComponentFixture<AssignmentMarkIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentMarkIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentMarkIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
