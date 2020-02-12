import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatVideoComponent } from './mat-video.component';

describe('MatVideoComponent', () => {
  let component: MatVideoComponent;
  let fixture: ComponentFixture<MatVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
