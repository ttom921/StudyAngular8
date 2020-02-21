import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch01HelloWorldComponent } from './ch01-hello-world.component';

describe('Ch01HelloWorldComponent', () => {
  let component: Ch01HelloWorldComponent;
  let fixture: ComponentFixture<Ch01HelloWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch01HelloWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch01HelloWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
