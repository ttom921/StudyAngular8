import { Component, OnInit, ViewChild } from '@angular/core';
import { CircleProgressComponent } from 'src/app/_common/circle-progress/circle-progress.component';
import { MatSlider, MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-ng-circle-progress',
  templateUrl: './ng-circle-progress.component.html',
  styleUrls: ['./ng-circle-progress.component.scss']
})
export class NgCircleProgressComponent implements OnInit {
  @ViewChild('slider', { static: true }) slider: MatSlider;
  @ViewChild('circlepg', { static: true }) circlepg: CircleProgressComponent;
  //全部的容量
  vdisk_total: number = 800;
  //註冊車子的數量
  regCar = 10;
  //各車容量最大限制
  maxLimit: number = 50;
  //使用量
  userprogress = 10;
  data = {
    vdisk_total: 800000000,
    canUploadCarTotal: 10,
    //# 每台車量最大儲存容量
    car_disk_total: 50000000,
  }
  constructor() {

  }

  ngOnInit() {
    //console.log(this.circlepg);
    this.regCar = this.data.canUploadCarTotal;
    //全部容量
    this.vdisk_total = this.formatSizeNoUnits(this.data.vdisk_total);
    //計算各車的最大容量限制
    this.calMaxLimit();
    this.slider.value = this.formatSizeNoUnits(this.data.car_disk_total); //this.maxLimit;
    this.calTotalRemindDiskRate();
    //this.totalslider.value = this.calTotalRemindDisk();
  }
  // subtitleFormat callback example
  formatSubtitle = (percent: number): string[] => {
    const totaluserd = this.regCar * this.slider.value;
    return [`${totaluserd}/${this.vdisk_total}G`];
    if (percent >= 100) {
      return ["Congratulations!"]
    } else if (percent >= 50) {
      return ["hard", "Half"]
    } else if (percent > 0) {
      return ["Just began"]
    } else {
      return ["Not started"]
    }
  }
  //#region 計算容量相關
  onInputChange(event: MatSliderChange) {
    //console.log(event.value);
    //console.log(this.slider);
    this.slider.value = event.value;
    if (event.value >= this.maxLimit) {
      this.slider.value = this.maxLimit;
    }
    //console.log(`maxLimit=${this.maxLimit}`);
    this.calTotalRemindDiskRate();
  }
  formatLabel(value: number) {
    return Math.round(value) + 'G';
  }
  //計算最大各車容
  calMaxLimit() {
    this.maxLimit = Math.round(this.vdisk_total / this.regCar);
    if (this.maxLimit >= 100) {
      this.maxLimit = 100;
    }
  }
  // //計算剩下的硬碟空間
  // calTotalRemindDisk() {
  //   //console.log("目前車子容量=" + this.slider.value);
  //   return Math.round(this.regCar * this.slider.value);
  // }
  //計算剩下的硬碟比例
  calTotalRemindDiskRate() {
    const totaluserd = this.regCar * this.slider.value;
    //console.log(`目前車子容量(${this.slider.value})*註冊車子(${this.regCar})=`);
    //console.log(`總使用容量=${totaluserd}`);
    this.userprogress = Math.round(totaluserd / this.vdisk_total * 100);
    //console.log(`使用比例=${this.userprogress}`);
  }
  formatSizeNoUnits(bytes) {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(0); }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(0); }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(0); }
    else if (bytes > 1) { bytes = bytes; }
    else if (bytes == 1) { bytes = bytes; }
    else {
      bytes = "0";
    }
    return bytes;
  }
  //#endregion

}
