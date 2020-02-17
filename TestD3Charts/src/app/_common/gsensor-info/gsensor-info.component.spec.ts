import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsensorInfoComponent } from './gsensor-info.component';

describe('GsensorInfoComponent', () => {
  let component: GsensorInfoComponent;
  let fixture: ComponentFixture<GsensorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsensorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsensorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
