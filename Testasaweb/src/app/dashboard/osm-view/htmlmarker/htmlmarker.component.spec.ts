import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HTMLMarkerComponent } from './htmlmarker.component';

describe('HTMLMarkerComponent', () => {
  let component: HTMLMarkerComponent;
  let fixture: ComponentFixture<HTMLMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HTMLMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HTMLMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
