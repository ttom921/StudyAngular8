import { Component, ViewEncapsulation, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatSliderChange, MatSlider } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {


  @ViewChild('slider', { static: true }) slider: MatSlider;
  @ViewChild('totalslider', { static: true }) totalslider: MatSlider;
  title = 'TestNg5Slider';
  //全部的容量
  totalDisk: number = 800;
  //目前各車的容量
  // currCarDiskValue: number = 50;
  //註冊車子的數量
  regCar = 10;
  //各車容量最大限制
  maxLimit: number = 50;
  constructor() {


  }
  ngOnInit(): void {
    console.log("ngOnInit");
    //計算各車的最大容量限制
    this.calMaxLimit();
    this.slider.value = this.maxLimit;
    this.totalslider.value = this.calTotalRemindDisk();

  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
  }
  onInputChange(event: MatSliderChange) {
    //console.log("This is emitted as the thumb slides");
    //console.log(event.value);
    //console.log(this.slider);
    this.slider.value = event.value;
    if (event.value >= this.maxLimit) {
      this.slider.value = this.maxLimit;
    }
    //this.calTotalRemindDisk();

    this.totalslider.value = this.calTotalRemindDisk();
    //console.log(this.totalslider.value);
  }
  formatLabel(value: number) {
    return Math.round(value) + 'G';
  }
  //計算㫕大各車容
  calMaxLimit() {
    this.maxLimit = Math.round(this.totalDisk / this.regCar);
  }
  //計算剩下的硬碟空間
  calTotalRemindDisk() {
    //console.log("目前車子容量=" + this.slider.value);
    return Math.round(this.regCar * this.slider.value);
  }

}
