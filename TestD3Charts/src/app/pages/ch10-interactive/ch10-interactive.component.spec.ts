import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch10InteractiveComponent } from './ch10-interactive.component';

describe('Ch10InteractiveComponent', () => {
  let component: Ch10InteractiveComponent;
  let fixture: ComponentFixture<Ch10InteractiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch10InteractiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch10InteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
