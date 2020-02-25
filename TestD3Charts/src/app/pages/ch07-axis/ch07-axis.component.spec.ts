import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch07AxisComponent } from './ch07-axis.component';

describe('Ch07AxisComponent', () => {
  let component: Ch07AxisComponent;
  let fixture: ComponentFixture<Ch07AxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch07AxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch07AxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
