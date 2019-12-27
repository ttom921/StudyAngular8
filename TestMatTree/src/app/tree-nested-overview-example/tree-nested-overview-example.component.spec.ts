import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNestedOverviewExampleComponent } from './tree-nested-overview-example.component';

describe('TreeNestedOverviewExampleComponent', () => {
  let component: TreeNestedOverviewExampleComponent;
  let fixture: ComponentFixture<TreeNestedOverviewExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeNestedOverviewExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNestedOverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
