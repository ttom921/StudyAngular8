import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDymcklistComponent } from './test-dymcklist.component';

describe('TestDymcklistComponent', () => {
  let component: TestDymcklistComponent;
  let fixture: ComponentFixture<TestDymcklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDymcklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDymcklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
