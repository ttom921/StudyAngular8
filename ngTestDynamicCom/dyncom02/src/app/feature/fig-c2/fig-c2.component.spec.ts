import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigC2Component } from './fig-c2.component';

describe('FigC2Component', () => {
  let component: FigC2Component;
  let fixture: ComponentFixture<FigC2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigC2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigC2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
