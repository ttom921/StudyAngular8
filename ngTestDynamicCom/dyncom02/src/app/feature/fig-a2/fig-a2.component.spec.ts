import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigA2Component } from './fig-a2.component';

describe('FigA2Component', () => {
  let component: FigA2Component;
  let fixture: ComponentFixture<FigA2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigA2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigA2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
