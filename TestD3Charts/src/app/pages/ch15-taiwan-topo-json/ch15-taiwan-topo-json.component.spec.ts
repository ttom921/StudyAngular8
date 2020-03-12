import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch15TaiwanTopoJsonComponent } from './ch15-taiwan-topo-json.component';

describe('Ch15TaiwanTopoJsonComponent', () => {
  let component: Ch15TaiwanTopoJsonComponent;
  let fixture: ComponentFixture<Ch15TaiwanTopoJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch15TaiwanTopoJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch15TaiwanTopoJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
