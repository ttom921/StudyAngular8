import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosePieComponent } from './rose-pie.component';

describe('RosePieComponent', () => {
  let component: RosePieComponent;
  let fixture: ComponentFixture<RosePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
