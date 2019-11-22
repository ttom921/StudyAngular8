import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBarComponent } from './driver-bar.component';

describe('DriverBarComponent', () => {
  let component: DriverBarComponent;
  let fixture: ComponentFixture<DriverBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
