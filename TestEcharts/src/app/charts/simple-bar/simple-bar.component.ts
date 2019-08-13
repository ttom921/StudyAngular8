import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestApiService } from 'src/app/share/rest-api.service';

@Component({
  selector: 'app-simple-bar',
  templateUrl: './simple-bar.component.html',
  styleUrls: ['./simple-bar.component.scss']
})
export class SimpleBarComponent implements OnInit {

  // 定義圖表項
  chartOption: EChartOption = {

  };
  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    this.restApi.getBar().subscribe((data: any) => {
      console.log(data);
      let axistitles = data.rawdata[0];
      let xAxisname = axistitles[0];
      //console.log(xAxisname);
      let yAxisname = axistitles[1];
      let xAxisData = [];
      let serdata = [];
      for (let index = 1; index < data.rawdata.length; index++) {
        const element = data.rawdata[index];
        xAxisData.push(element[0]);
        serdata.push(element[1]);
      }

      //圖表項賦值
      this.chartOption = {
        //調色盤列表。如果系列沒有設置顏色，則會依循環從該列表中取顏色作為系列顏色
        color: ['#59a1f8', '#78c87d', '#f6d464', '#445285', '#8e67de', '#e36f7e', '#70c9ca', '#d396c6', '#b09e6c', '#4f58d5', '#96a36f'],
        title: {
          text: "標題文字",
          left: 'center'
        },
        legend: {},
        tooltip: {},
        xAxis: {
          name: xAxisname,//x軸的標題
          nameLocation: 'middle',
          nameGap: 25,//坐標軸名稱與軸線之間的距離
          data: xAxisData,
        },
        yAxis: {
          name: yAxisname,//y軸的標題
          nameGap: 25,//坐標軸名稱與軸線之間的距離
          nameLocation: 'middle',
        },
        series: [{
          type: 'bar',
          data: serdata
        }]
      };
    });
  }

}
