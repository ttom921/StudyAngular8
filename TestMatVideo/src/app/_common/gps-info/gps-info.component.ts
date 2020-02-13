import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'gps-info',
  templateUrl: './gps-info.component.html',
  styleUrls: ['./gps-info.component.scss']
})
export class GpsInfoComponent implements OnInit {

  initOptions = {
    height: '92px'
  }
  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  }
  constructor() { }

  ngOnInit() {
  }

}
