import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { CarEventsService } from 'src/app/_services/car-events.service';

@Component({
  selector: 'app-line-fuelconsumption',
  templateUrl: './line-fuelconsumption.component.html',
  styleUrls: ['./line-fuelconsumption.component.scss']
})
export class LineFuelconsumptionComponent implements OnInit {
  //定義圖表項
  chartOption: EChartOption = {

  };
  constructor(
    private carEventsService: CarEventsService,
  ) { }

  ngOnInit() {
    this.carEventsService.GetTeamFuelConLine().subscribe(value => {
      //console.log(value);
      //console.log("------------------------------------");
      this.chartOption = {
        //這個顯示標題(可又可無)
        title: {
          text: value.title,
          //left: 'center'
        },
        //圖例(可又可無)
        legend: {
        },
        //游標指示大小(可又可無)
        tooltip: {
          trigger: 'axis'
        },
        //提供一份數據
        dataset: {
          source: value.source
        },
        // 聲明一個X軸，類目軸(category),默認情況下，類目軸對應到dataset第一列
        xAxis: {
          type: 'category',
        },
        // 聲明一個Y軸
        yAxis: {},
        series: [
          { type: 'line' },
          { type: 'line' },
          { type: 'line' }
        ]
      }
    });
  }

}
