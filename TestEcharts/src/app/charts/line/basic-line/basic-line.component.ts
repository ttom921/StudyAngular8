import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestApiService } from 'src/app/share/rest-api.service';
import { Source } from 'webpack-sources';

@Component({
  selector: 'app-basic-line',
  templateUrl: './basic-line.component.html',
  styleUrls: ['./basic-line.component.scss']
})
export class BasicLineComponent implements OnInit {
  chartOption: EChartOption = {
  }
  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    this.restApi.getLineChart().subscribe((data: any) => {
      console.log(data.source);
      //圖表項賦值
      this.chartOption = {
        legend: {},
        tooltip: {},
        //提供一份數據
        dataset: {
          source: data.source
        },
        // 聲明一個X軸，類目軸(category),默認情況下，類目軸對應到dataset第一列
        xAxis: { type: 'category' },
        // 聲明一個Y軸，數值軸
        yAxis: {},
        // 聲明一個line
        series: [
          { type: 'line' },
        ]
      };
    });
  }

}
