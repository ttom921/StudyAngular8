import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigA1Component } from './fig-a1.component';

describe('FigA1Component', () => {
  let component: FigA1Component;
  let fixture: ComponentFixture<FigA1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
