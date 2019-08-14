import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAniDelayComponent } from './bar-ani-delay.component';

describe('BarAniDelayComponent', () => {
  let component: BarAniDelayComponent;
  let fixture: ComponentFixture<BarAniDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarAniDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarAniDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
