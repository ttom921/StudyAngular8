import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch08BarChartComponent } from './ch08-bar-chart.component';

describe('Ch08BarChartComponent', () => {
  let component: Ch08BarChartComponent;
  let fixture: ComponentFixture<Ch08BarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch08BarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch08BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
