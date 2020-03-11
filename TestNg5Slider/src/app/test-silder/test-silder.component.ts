import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';

//import * as d3 from 'd3';
declare var d3: any;

@Component({
  selector: 'app-test-silder',
  templateUrl: './test-silder.component.html',
  styleUrls: ['./test-silder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestSilderComponent implements OnInit {
  @ViewChild('slider', { static: true }) slider: MatSlider;
  @ViewChild('totalslider', { static: true }) totalslider: MatSlider;

  //全部的容量
  totalDisk: number = 800;
  //目前各車的容量
  //註冊車子的數量
  regCar = 10;
  //各車容量最大限制
  maxLimit: number = 50;

  constructor() { }

  ngOnInit() {
    //計算各車的最大容量限制
    this.calMaxLimit();
    this.slider.value = this.maxLimit;
    this.totalslider.value = this.calTotalRemindDisk();
    this.initD3();
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
  initD3() {
    //console.log(d3);
    var slider = d3
      .sliderHorizontal()
      .min(10)
      .max(100)
      .step(1)
      .width(300)
      .displayValue(false)
      .on('onchange', val => {
        d3.select('#value').text(val);
      });

    d3.select('#slider')
      .append('svg')
      .attr('width', 500)
      .attr('height', 100)
      .append('g')
      .attr('transform', 'translate(30,30)')
      .call(slider);
  }
}
