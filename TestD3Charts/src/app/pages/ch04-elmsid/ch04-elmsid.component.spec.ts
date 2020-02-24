import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch04ElmsidComponent } from './ch04-elmsid.component';

describe('Ch04ElmsidComponent', () => {
  let component: Ch04ElmsidComponent;
  let fixture: ComponentFixture<Ch04ElmsidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch04ElmsidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch04ElmsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
