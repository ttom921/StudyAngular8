import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTestSilderComponent } from './ng-test-silder.component';

describe('NgTestSilderComponent', () => {
  let component: NgTestSilderComponent;
  let fixture: ComponentFixture<NgTestSilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTestSilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTestSilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
