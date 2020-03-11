import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSilderComponent } from './test-silder.component';

describe('TestSilderComponent', () => {
  let component: TestSilderComponent;
  let fixture: ComponentFixture<TestSilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
