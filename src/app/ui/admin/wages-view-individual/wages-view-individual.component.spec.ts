import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesViewIndividualComponent } from './wages-view-individual.component';

describe('WagesViewIndividualComponent', () => {
  let component: WagesViewIndividualComponent;
  let fixture: ComponentFixture<WagesViewIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagesViewIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagesViewIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
