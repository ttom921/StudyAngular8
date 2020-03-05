import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch12ForceDirectedGraphComponent } from './ch12-force-directed-graph.component';

describe('Ch12ForceDirectedGraphComponent', () => {
  let component: Ch12ForceDirectedGraphComponent;
  let fixture: ComponentFixture<Ch12ForceDirectedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch12ForceDirectedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch12ForceDirectedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
