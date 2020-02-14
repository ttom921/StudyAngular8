import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-play-manager',
  templateUrl: './video-play-manager.component.html',
  styleUrls: ['./video-play-manager.component.scss']
})
export class VideoPlayManagerComponent implements OnInit {
  private chartData: Array<any>;
  constructor() { }

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }
  generateData() {
    // for (let i = 0; i < (8); i++) {
    //   this.dataset.push(Math.floor(Math.random() * 80));
    // }

    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push(Math.floor(Math.random() * 100));
    }
  }

}
