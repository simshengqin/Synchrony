import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCategoriesComponent } from './explore-categories.component';

describe('ExploreCategoriesComponent', () => {
  let component: ExploreCategoriesComponent;
  let fixture: ComponentFixture<ExploreCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
