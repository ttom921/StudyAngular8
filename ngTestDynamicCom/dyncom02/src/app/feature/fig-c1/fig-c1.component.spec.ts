import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigC1Component } from './fig-c1.component';

describe('FigC1Component', () => {
  let component: FigC1Component;
  let fixture: ComponentFixture<FigC1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigC1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigC1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
