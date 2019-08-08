import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCComponent } from './route-c.component';

describe('RouteCComponent', () => {
  let component: RouteCComponent;
  let fixture: ComponentFixture<RouteCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
