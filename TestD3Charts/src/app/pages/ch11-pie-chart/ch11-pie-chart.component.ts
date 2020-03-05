import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch11-pie-chart',
  templateUrl: './ch11-pie-chart.component.html',
  styleUrls: ['./ch11-pie-chart.component.scss']
})
export class Ch11PieChartComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  dataset = [30, 10, 43, 55, 13, 20];//需要將這些數據變成餅狀圖的數據
  constructor() { }

  ngOnInit() {
    this.drawChart();
  }
  private drawChart() {
    //svg 畫布大小
    const width = 860;
    const height = 500;
    //得到svg畫布
    const svg = d3.select(this.svgRef.nativeElement);
    //設定svg畫布大小
    svg.attr("width", width);
    svg.attr("height", height);
    const marge = { top: 60, botton: 60, left: 60, right: 60 };
    //位置信息
    let center = {
      x: `${(width - marge.left - marge.right) / 2}`,
      y: `${(height - marge.top - marge.botton) / 2}`
    };
    const g = svg.append("g");
    g.attr("transform", `translate(${center.x},${center.y})`);
    //設置一個顏色比例尺，為了讓不同的扇形呈不同的顏色
    const colorScale = d3.scaleOrdinal<number, string>()
      .domain(d3.range(this.dataset.length))
      .range(d3.schemeCategory10);
    // const colorScalestr = d3.scaleOrdinal()
    //   .domain(d3.range(this.dataset.length).map((d) => d + ""))
    //   .range(d3.schemeCategory10);
    //新建一個弧形生成器
    const innerRadius = 0;//內半徑
    const outerRadius = 100;//外半徑
    const arc_generator = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    //將原始數據變成可以繪制餅個的數據
    let pieData = d3.pie()(this.dataset);
    //在控制瀏覽器的控制台打印pieData
    console.log(pieData);
    //資料對映
    const gs = g.selectAll("path")
      .data(pieData)
      .enter();

    gs.append("path")
      .attr("d", (d: any) => {
        return arc_generator(d);//往弧形生成器中導出數據
      })
      .attr("fill", (d, i) => {
        return colorScale(i);//設置顏色
      });

    //繪制文字
    gs.append("text")
      .attr("transform", (d: any) => {//位置設在中心處
        return `translate(${arc_generator.centroid(d)})`
      })
      .attr("text-anchor", "middle")
      .text((d: any) => {
        return d.data;
      })
  }


}
