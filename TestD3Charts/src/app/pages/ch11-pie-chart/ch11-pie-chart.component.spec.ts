import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch11PieChartComponent } from './ch11-pie-chart.component';

describe('Ch11PieChartComponent', () => {
  let component: Ch11PieChartComponent;
  let fixture: ComponentFixture<Ch11PieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch11PieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch11PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
