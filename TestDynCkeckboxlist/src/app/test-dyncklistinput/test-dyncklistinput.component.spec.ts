import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDyncklistinputComponent } from './test-dyncklistinput.component';

describe('TestDyncklistinputComponent', () => {
  let component: TestDyncklistinputComponent;
  let fixture: ComponentFixture<TestDyncklistinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDyncklistinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDyncklistinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
