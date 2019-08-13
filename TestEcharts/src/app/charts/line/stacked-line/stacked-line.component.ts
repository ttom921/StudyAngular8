import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestApiService } from 'src/app/share/rest-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-stacked-line',
  templateUrl: './stacked-line.component.html',
  styleUrls: ['./stacked-line.component.scss']
})
export class StackedLineComponent implements OnInit {
  chartOption: EChartOption = {
  }
  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    forkJoin(
      this.restApi.getLineStackMail(),
      this.restApi.getLineStackAllia(),
      this.restApi.getLineStackVideo()
    ).subscribe((dataary) => {
      //console.log(dataary[0]);
      //console.log(dataary[1]);
      let tablehead = dataary[0].source.week;
      //console.log(tablehead);
      //圖表項賦值
      this.chartOption = {
        legend: {
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        //提供一份數據
        dataset: {
          source: {
            "week": dataary[0].source.week,
            "line1": dataary[0].source.value,
            "line2": dataary[1].source.value,
            "line3": dataary[2].source.value
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '郵件營銷',
            type: 'line',
            stack: '總量'
          },
          {
            name: '聯盟廣告',
            type: 'line',
            stack: '總量'
          },
          ,
          {
            name: '視頻廣告',
            type: 'line',
            stack: '總量'
          },
        ]
      }
    });
  }

}
