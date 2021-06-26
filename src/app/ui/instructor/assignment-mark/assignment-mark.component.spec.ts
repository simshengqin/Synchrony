import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentMarkComponent } from './assignment-mark.component';

describe('AssignmentMarkComponent', () => {
  let component: AssignmentMarkComponent;
  let fixture: ComponentFixture<AssignmentMarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentMarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
