import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch14TopoJSONComponent } from './ch14-topo-json.component';

describe('Ch14TopoJSONComponent', () => {
  let component: Ch14TopoJSONComponent;
  let fixture: ComponentFixture<Ch14TopoJSONComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch14TopoJSONComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch14TopoJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
