import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEventListComponent } from './car-event-list.component';

describe('CarEventListComponent', () => {
  let component: CarEventListComponent;
  let fixture: ComponentFixture<CarEventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarEventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
