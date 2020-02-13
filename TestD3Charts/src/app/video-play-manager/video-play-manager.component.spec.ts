import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayManagerComponent } from './video-play-manager.component';

describe('VideoPlayManagerComponent', () => {
  let component: VideoPlayManagerComponent;
  let fixture: ComponentFixture<VideoPlayManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPlayManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
