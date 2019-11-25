import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWebdatarockspivotComponent } from './test-webdatarockspivot.component';

describe('TestWebdatarockspivotComponent', () => {
  let component: TestWebdatarockspivotComponent;
  let fixture: ComponentFixture<TestWebdatarockspivotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestWebdatarockspivotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWebdatarockspivotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
