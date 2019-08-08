import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigB1Component } from './fig-b1.component';

describe('FigB1Component', () => {
  let component: FigB1Component;
  let fixture: ComponentFixture<FigB1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigB1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigB1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
