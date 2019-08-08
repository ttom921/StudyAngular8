import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigB2Component } from './fig-b2.component';

describe('FigB2Component', () => {
  let component: FigB2Component;
  let fixture: ComponentFixture<FigB2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigB2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigB2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
