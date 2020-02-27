import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch09BarcharAniComponent } from './ch09-barchar-ani.component';

describe('Ch09BarcharAniComponent', () => {
  let component: Ch09BarcharAniComponent;
  let fixture: ComponentFixture<Ch09BarcharAniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch09BarcharAniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch09BarcharAniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
