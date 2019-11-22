import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFuelconsumptionComponent } from './line-fuelconsumption.component';

describe('LineFuelconsumptionComponent', () => {
  let component: LineFuelconsumptionComponent;
  let fixture: ComponentFixture<LineFuelconsumptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineFuelconsumptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineFuelconsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
