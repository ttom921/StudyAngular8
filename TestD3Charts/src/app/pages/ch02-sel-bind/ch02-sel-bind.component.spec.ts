import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch02SelBindComponent } from './ch02-sel-bind.component';

describe('Ch02SelBindComponent', () => {
  let component: Ch02SelBindComponent;
  let fixture: ComponentFixture<Ch02SelBindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch02SelBindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch02SelBindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
