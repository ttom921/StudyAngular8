import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch05SimplebarComponent } from './ch05-simplebar.component';

describe('Ch05SimplebarComponent', () => {
  let component: Ch05SimplebarComponent;
  let fixture: ComponentFixture<Ch05SimplebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch05SimplebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch05SimplebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
