import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch06ScaleComponent } from './ch06-scale.component';

describe('Ch06ScaleComponent', () => {
  let component: Ch06ScaleComponent;
  let fixture: ComponentFixture<Ch06ScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch06ScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch06ScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
