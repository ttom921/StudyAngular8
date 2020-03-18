import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCircleProgressComponent } from './ng-circle-progress.component';

describe('NgCircleProgressComponent', () => {
  let component: NgCircleProgressComponent;
  let fixture: ComponentFixture<NgCircleProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCircleProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCircleProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
