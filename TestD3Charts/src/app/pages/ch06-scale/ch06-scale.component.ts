import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { appendFile } from 'fs';
@Component({
  selector: 'app-ch06-scale',
  templateUrl: './ch06-scale.component.html',
  styleUrls: ['./ch06-scale.component.scss']
})
export class Ch06ScaleComponent implements OnInit {

  @ViewChild('chartscale', { static: true }) private chartscale: ElementRef;
  @ViewChild('chartscale1', { static: true }) private chartscale1: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;

  dataset = [2.5, 2.1, 1.7, 1.3, 0.9];

  constructor() { }

  ngOnInit() {
    this.testScale();
    this.testOrdinal();
    this.testsampleBar();
  }
  private testScale() {
    const chart = d3.select(this.chartscale.nativeElement);//得到畫布
    const min = d3.min(this.dataset);//得到最小值
    const max = d3.max(this.dataset);//得到最大值
    const scaleLiner = d3.scaleLinear()
      .domain([min, max])
      .range([0, 300])
      ;
    for (let i = 0; i < this.dataset.length; i++) {
      let svalue = this.dataset[i];
      chart.append("p").text(`scaleLiner(${svalue})輸出：${scaleLiner(svalue)}`);
    }
  }
  private testOrdinal() {
    const chart = d3.select(this.chartscale1.nativeElement);//得到畫布
    let index = ["0", "1", "2", "3", "4"];
    let color = ["red", "blue", "yellow", "black", "green"];
    const scaleOrdinal = d3.scaleOrdinal()
      .domain(index)
      .range(color)
      ;
    for (let i = 0; i < index.length; i++) {
      let svalue = index[i];
      chart.append("p").text(`scaleOrdinal(${svalue})輸出：${scaleOrdinal(svalue)}`);
    }
  }
  private testsampleBar() {
    //定義一個線性比例尺
    const min = 0;//得到最小值
    const max = d3.max(this.dataset);//得到最大值
    const scaleLiner = d3.scaleLinear()
      .domain([min, max])
      .range([0, 300])
      ;
    const svg = d3.select(this.svgRef.nativeElement);//得到svg畫布
    const g = svg.append("g")//定義一個用裝個個圖表的一個分組，並設置他的位置
    const rectHeight = 30;//設置每一個矩形的高度
    g.selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", 20)
      .attr("y", (d, i) => {
        return i * rectHeight;
      })
      .attr("width", (d, i) => {
        return scaleLiner(d);
      })
      .attr("height", rectHeight - 5)
      .attr("fill", "blue")
      ;
  }


}
