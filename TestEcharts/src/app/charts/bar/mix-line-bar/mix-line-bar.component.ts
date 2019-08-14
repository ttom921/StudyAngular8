import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/share/rest-api.service';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-mix-line-bar',
  templateUrl: './mix-line-bar.component.html',
  styleUrls: ['./mix-line-bar.component.scss']
})
export class MixLineBarComponent implements OnInit {
  chartOption: EChartOption = {
  }
  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    this.restApi.getBarMixLine().subscribe((data: any) => {
      this.TestGendata(data.source);
      console.log(data);
      this.chartOption = {
        //這個顯示標題(可又可無)
        title: {
          text: '折柱混合'
        },
        //圖例(可又可無)
        legend: {
        },
        //游標指示大小(可又可無)
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          }
        },

        //提供一份數據
        dataset: {
          source: data.source
        },
        // 聲明一個X軸，類目軸(category),默認情況下，類目軸對應到dataset第一列
        xAxis: {
          type: 'category',
          //指示時會產生陰影
          axisPointer: {
            type: 'shadow'
          }
        },
        // 聲明一個Y軸
        yAxis: [{//在左邊的Y軸，會顯示水量和單位和限制大小
          type: 'value',
          name: '水量',
          min: 0,
          max: 250,
          axisLabel: {
            formatter: '{value} ml'
          }
        }, {//在右邊的Y軸，會顯示溫竑和單位和限制大小
          type: 'value',
          name: '溫度',
          min: 0,
          max: 25,
          axisLabel: {
            formatter: '{value} °C'
          }

        }],
        series: [{
          name: '蒸發量',
          type: 'bar',
        }, {
          name: '降雨量',
          type: 'bar',
        }, {
          name: '平均溫度',
          type: 'line',
          yAxisIndex: 1,//以右邊的為主
        }]
      }
    });
  }
  TestGendata(data: any) {
    data.item = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    //蒸發量
    data.data1 = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3];
    //降雨量
    data.data2 = [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3];
    //平均溫度
    data.data3 = [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2];

  }
}
