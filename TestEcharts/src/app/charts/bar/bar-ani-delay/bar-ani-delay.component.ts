import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestApiService } from 'src/app/share/rest-api.service';

@Component({
  selector: 'app-bar-ani-delay',
  templateUrl: './bar-ani-delay.component.html',
  styleUrls: ['./bar-ani-delay.component.scss']
})
export class BarAniDelayComponent implements OnInit {

  chartOption: EChartOption = {
  }

  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    this.restApi.getBarAniDelay().subscribe((data: any) => {
      this.TestGendata(data.source);
      console.log(data);
      //圖表項賦值
      this.chartOption = {
        //這個顯示標題(可又可無)
        title: {
          text: '柱狀圖動畫延遲'
        },
        //圖例(可又可無)
        legend: {
        },
        //游標指示大小(可又可無)
        tooltip: {

        },
        //提供一份數據
        dataset: {
          source: data.source
        },
        // 聲明一個X軸，類目軸(category),默認情況下，類目軸對應到dataset第一列
        xAxis: {
          type: 'category',
        },
        // 聲明一個Y軸
        yAxis: {},
        series: [{
          name: 'bar',
          type: 'bar',
          animationDelay: function (idx) {
            return idx * 10;
          }
        }, {
          name: 'bar2',
          type: 'bar',
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }]
      }
      
    });
  }
  TestGendata(data: any) {
    for (var i = 0; i < 100; i++) {
      data.item.push('类目' + i);
      data.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data.data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

  }

}
