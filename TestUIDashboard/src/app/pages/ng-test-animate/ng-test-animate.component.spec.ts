import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTestAnimateComponent } from './ng-test-animate.component';

describe('NgTestAnimateComponent', () => {
  let component: NgTestAnimateComponent;
  let fixture: ComponentFixture<NgTestAnimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTestAnimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTestAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
