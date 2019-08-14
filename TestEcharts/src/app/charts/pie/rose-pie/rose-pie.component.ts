import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestApiService } from 'src/app/share/rest-api.service';

@Component({
  selector: 'app-rose-pie',
  templateUrl: './rose-pie.component.html',
  styleUrls: ['./rose-pie.component.scss']
})
export class RosePieComponent implements OnInit {
  chartOption: EChartOption = {
  }
  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    this.restApi.getRosePie().subscribe((data: any) => {
      this.chartOption = {
        //這個顯示標題(可又可無)
        title: {
          text: '南丁格爾玻瑰圖',
          subtext: '純屬虛構',
          left: 'center'
        },
        //圖例(可又可無)
        legend: {
          orient: 'horizontal', // 'vertical'
          x: 'center', // 'center' | 'left' | {number},
          y: 'bottom', // 'center' | 'bottom' | {number}
        },
        //游標指示大小(可又可無)
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/> {c} ({d}%)"
        },
        //提供一份數據
        dataset: {
          source: data.source
        },
        series: [{
          name: '半徑模式',
          type: 'pie',
          radius: [20, 110],
          center: ['25%', '50%'],
          roseType: 'radius',
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: true
            }
          }
        }, {
          name: '面積模式',
          type: 'pie',
          radius: [30, 110],
          center: ['75%', '50%'],
          roseType: 'area',
        }]

      };
    });
  }

}
