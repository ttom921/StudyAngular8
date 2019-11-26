import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGoogleChartComponent } from './test-google-chart.component';

describe('TestGoogleChartComponent', () => {
  let component: TestGoogleChartComponent;
  let fixture: ComponentFixture<TestGoogleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGoogleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGoogleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
