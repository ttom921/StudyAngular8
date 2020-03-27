import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CarVideoService } from '../_service/video/car-video.service';
import { MatVideoComponent } from '../_common/video/video.component';
import { GsensorInfoComponent } from '../_common/gsensor-info/gsensor-info.component';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-video-play-manager',
  templateUrl: './video-play-manager.component.html',
  styleUrls: ['./video-play-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

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
  currentTime: any;
  @ViewChild('gensor', { static: true }) gsensorInfo: GsensorInfoComponent;
  constructor(
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
    //取得duration的時間
    this.elmainvideo = this.matMainVideo.getVideoTag();
    this.elmainvideo.addEventListener('loadedmetadata', function () {
      //console.log(this);
      //console.log(this.duration);
    });



  }
  onVideoclick(event: Event, itemvideo) {
    //event.preventDefault();
    event.stopPropagation();
    //console.log(itemvideo.src);
    this.mainvideo.src = itemvideo.src;
    return false;
  }
  onTimechang(seconds) {

    this.currentTime = Math.floor(seconds);
    //console.log("onTimechang=" + this.currentTime);
    this.gsensorInfo.setDurationTime(this.currentTime);
  }
  onGpsTimechang(seconds) {
    //this.currentTime = seconds;
    console.log(seconds);
    this.matMainVideo.time = seconds;
  }
  TestClick(event: Event) {
    event.stopPropagation();
    console.log('TestClick->');
    //console.log('TestClick->' + this.elmainvideo.currentTime);
    return false;

  }
}
