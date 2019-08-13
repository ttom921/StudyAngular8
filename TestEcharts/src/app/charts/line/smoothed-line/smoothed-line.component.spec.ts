import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothedLineComponent } from './smoothed-line.component';

describe('SmoothedLineComponent', () => {
  let component: SmoothedLineComponent;
  let fixture: ComponentFixture<SmoothedLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmoothedLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothedLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
