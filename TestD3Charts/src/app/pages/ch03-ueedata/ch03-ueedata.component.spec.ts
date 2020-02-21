import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ch03UEEdataComponent } from './ch03-ueedata.component';

describe('Ch03UEEdataComponent', () => {
  let component: Ch03UEEdataComponent;
  let fixture: ComponentFixture<Ch03UEEdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ch03UEEdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ch03UEEdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
