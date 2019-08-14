import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { RestApiService } from 'src/app/share/rest-api.service';

@Component({
  selector: 'app-simple-pie',
  templateUrl: './simple-pie.component.html',
  styleUrls: ['./simple-pie.component.scss']
})
export class SimplePieComponent implements OnInit {
  chartOption: EChartOption = {
  }
  constructor(private restApi: RestApiService) { }

  ngOnInit() {
    // let data = {
    //   "source": {
    //     "item": ["直接訪問", "周二", "周三", "周四", "周五", "周六", "周日"],
    //     "value": [150, 232, 201, 154, 190, 330, 410]
    //   }
    // };
    this.restApi.getPieSample().subscribe((data: any) => {
      this.chartOption = {
        //這個顯示標題(可又可無)
        title: {
          text: '某站用戶訪問來源',
          subtext: '純屬虛構',
          left: 'center'
        },
        //圖例(可又可無)
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        //游標指示大小(可又可無)
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{c}({d}%)"
        },
        //提供一份數據
        dataset: {
          source: data.source
        },
        series: [
          {
            name: '訪問來源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],

      };
    });

  }


}
