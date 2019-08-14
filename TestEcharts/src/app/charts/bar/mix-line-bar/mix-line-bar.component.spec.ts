import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixLineBarComponent } from './mix-line-bar.component';

describe('MixLineBarComponent', () => {
  let component: MixLineBarComponent;
  let fixture: ComponentFixture<MixLineBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixLineBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixLineBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
