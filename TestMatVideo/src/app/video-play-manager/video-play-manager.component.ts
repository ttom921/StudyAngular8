import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { CarVideoService } from '../_service/video/car-video.service';
import { MatVideoComponent } from '../_common/video/mat-video.component';

@Component({
  selector: 'app-video-play-manager',
  templateUrl: './video-play-manager.component.html',
  styleUrls: ['./video-play-manager.component.scss']
})
export class VideoPlayManagerComponent implements OnInit {

  @ViewChild('myvideo', { static: true }) myVideo: ElementRef;
  elmyvideo: HTMLVideoElement;
  //播放列表
  videolist = [];
  //主要播放
  @ViewChild('mainvideoid', { static: true }) matMainVideo: MatVideoComponent;
  elmainvideo: HTMLVideoElement;
  mainvideo = {
    src: ""
  };
  constructor(
    private renderer: Renderer2,
    private carVideoService: CarVideoService
  ) {
    this.carVideoService.Get("台-8888").subscribe(
      res => {
        this.videolist = res;
        console.log(this.videolist);
        this.mainvideo.src = res[0].src;
      }
    );
  }

  ngOnInit() {
    // this.elmainvideo = this.matMainVideo.getVideoTag();
    // this.elmainvideo.addEventListener('timeupdate', (ev) => {
    //   console.log('video timeupdate->' + this.elmainvideo.currentTime);

    // });
    // console.log(this.myVideo);
    //this.elmyvideo = this.myVideo.nativeElement as HTMLVideoElement;

    // this.elmyvideo.addEventListener('click', (ev) => {
    //   console.log('video click->' + this.elmainvideo.currentTime);
    //   return false;
    // })
  }
  onVideoclick(event: Event, itemvideo) {
    //event.preventDefault();
    event.stopPropagation();
    //console.log(itemvideo.src);
    return false;
  }
  TestClick(event: Event) {
    event.stopPropagation();
    console.log('TestClick->');
    //console.log('TestClick->' + this.elmainvideo.currentTime);
    return false;

  }
}
