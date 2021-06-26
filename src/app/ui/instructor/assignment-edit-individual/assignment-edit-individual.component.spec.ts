import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentEditIndividualComponent } from './assignment-edit-individual.component';

describe('AssignmentEditIndividualComponent', () => {
  let component: AssignmentEditIndividualComponent;
  let fixture: ComponentFixture<AssignmentEditIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentEditIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentEditIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
