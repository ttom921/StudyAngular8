import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAreaComponent } from './basic-area.component';

describe('BasicAreaComponent', () => {
  let component: BasicAreaComponent;
  let fixture: ComponentFixture<BasicAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
