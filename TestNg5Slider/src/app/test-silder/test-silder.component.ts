import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { MatCard } from '@angular/material/card';

//import * as d3 from 'd3';
declare var d3: any;

@Component({
  selector: 'app-test-silder',
  templateUrl: './test-silder.component.html',
  styleUrls: ['./test-silder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestSilderComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', { static: true }) slider: MatSlider;
  @ViewChild('totalslider', { static: true }) totalslider: MatSlider;
  @ViewChild('chart_container', { static: true }) chart_container: ElementRef;

  //全部的容量
  totalDisk: number = 800;
  //目前各車的容量
  //註冊車子的數量
  regCar = 10;
  //各車容量最大限制
  maxLimit: number = 50;

  //
  d3slider: any;
  sliderFill: any;
  constructor() { }


  ngOnInit() {
    //console.log(this.chart_container);
    //console.log(this.chart_container.nativeElement);
    //console.log(this.chart_container.nativeElement.offsetWidth);

    //計算各車的最大容量限制
    this.calMaxLimit();
    this.slider.value = this.maxLimit;
    this.totalslider.value = this.calTotalRemindDisk();
    this.initD3();
    this.initFillD3();
  }
  ngAfterViewInit(): void {
    console.log(this.chart_container.nativeElement.offsetWidth);
    console.log(this.chart_container.nativeElement.offsetHeight);
    //console.log(this.chart_container);
    //console.log(this.chart_container);
    //console.dir(this.chart_container);
  }
  onInputChange(event: MatSliderChange) {
    //console.log("This is emitted as the thumb slides");
    //console.log(event.value);
    //console.log(this.slider);
    this.slider.value = event.value;

    if (event.value >= this.maxLimit) {
      this.slider.value = this.maxLimit;
    }
    //this.d3slider.value(this.slider.value);
    this.setD3SliderValue(this.slider.value);
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
  setD3SliderValue(value) {
    this.d3slider.value(this.slider.value);
    this.sliderFill.value(this.slider.value);
  }
  initD3() {

    //console.log(d3);
    this.d3slider = d3
      .sliderHorizontal()
      .min(10)
      .max(100)
      .step(1)
      .width(260)
      .displayValue(false)
      .on('onchange', val => {
        d3.select('#value').text(val);
      })
      .default(this.slider.value)
      ;
    d3.select('#value').text(this.slider.value);
    //console.dir(this.d3slider);

    d3.select('#slider')
      .append('svg')
      .attr('width', 360)
      .attr('height', 160)
      .attr("viewBox", `0 0 300 100`)
      .attr("preserveAspectRatio", `xMidYMid`)
      .append('g')
      .attr('transform', 'translate(20,50)')
      .call(this.d3slider);
  }
  initFillD3() {
    //console.log(d3);
    this.sliderFill = d3
      .sliderHorizontal()
      .min(10)
      .max(100)
      .step(1)
      .width(260)
      .displayValue(false)
      .fill('#2196f3')
      .on('onchange', val => {
        //d3.select('#value').text(val);
      })
      .default(this.slider.value)
      ;
    //d3.select('#value').text(this.slider.value);
    //console.dir(this.d3slider);

    d3.select('#sliderFill')
      .append('svg')
      .attr('width', 360)
      .attr('height', 160)
      .attr("viewBox", `0 0 300 100`)
      .attr("preserveAspectRatio", `xMidYMid`)
      .append('g')
      .attr('transform', 'translate(20,50)')
      .call(this.sliderFill);
  }
}
