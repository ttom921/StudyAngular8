import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularProgressBarsComponent } from './angular-progress-bars.component';

describe('AngularProgressBarsComponent', () => {
  let component: AngularProgressBarsComponent;
  let fixture: ComponentFixture<AngularProgressBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularProgressBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularProgressBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
