import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedViewComponent } from './uploaded-view.component';

describe('UploadedViewComponent', () => {
  let component: UploadedViewComponent;
  let fixture: ComponentFixture<UploadedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
