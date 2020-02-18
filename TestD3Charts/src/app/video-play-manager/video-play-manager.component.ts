import { Component, OnInit, ViewChild } from '@angular/core';
import { GsensorInfoComponent } from '../_common/gsensor-info/gsensor-info.component';

@Component({
  selector: 'app-video-play-manager',
  templateUrl: './video-play-manager.component.html',
  styleUrls: ['./video-play-manager.component.scss']
})
export class VideoPlayManagerComponent implements OnInit {
  @ViewChild('gensor', { static: true }) private gsensorcom: GsensorInfoComponent;
  //protected chartData: Array<any>;
  constructor() { }

  ngOnInit() {

    //give everything a chance to get loaded before starting the animation to reduce choppiness
    // setTimeout(() => {
    //   //this.generateData();

    //   // change the data periodically
    //   setInterval(() => this.generateData(), 3000);
    // }, 1000);
  }
  generateData() {
    // this.chartData = [];
    // for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    //   this.chartData.push(Math.floor(Math.random() * 100));
    // }
    // let second = Math.floor(Math.random() * 3600);
    // console.log(second);
    // this.gsensorcom.setDurationTime(second);
  }

}
