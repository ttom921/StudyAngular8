import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsInfoComponent } from './gps-info.component';

describe('GpsInfoComponent', () => {
  let component: GpsInfoComponent;
  let fixture: ComponentFixture<GpsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
