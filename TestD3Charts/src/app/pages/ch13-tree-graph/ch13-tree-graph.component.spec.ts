import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch13TreeGraphComponent } from './ch13-tree-graph.component';

describe('Ch13TreeGraphComponent', () => {
  let component: Ch13TreeGraphComponent;
  let fixture: ComponentFixture<Ch13TreeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch13TreeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch13TreeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
