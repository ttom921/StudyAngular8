import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch07-axis',
  templateUrl: './ch07-axis.component.html',
  styleUrls: ['./ch07-axis.component.scss']
})
export class Ch07AxisComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  @ViewChild('svg2', { static: true }) svgRef2: ElementRef<SVGElement>;

  dataset = [2.5, 2.1, 1.7, 1.3, 0.9];
  rectHeight = 30;//設置每一個矩形的高度
  constructor() { }

  ngOnInit() {
    this.testAxis();
    this.drawAxis();
  }
  private testAxis() {
    //為坐標軸定義一個線性比例尺
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset)])
      .range([0, 250]);
    //定義一個坐標軸
    const xAxis = d3.axisBottom(xScale)//定義一個axis,由bottom可知，是朝下的
      .ticks(7); //設置刻度數目
    const svg = d3.select(this.svgRef.nativeElement);//得到svg畫布
    const g = svg.append("g")//定義一個用裝個個圖表的一個分組，並設置他的位置
    g.attr("transform", `translate(20,${this.dataset.length * this.rectHeight - this.rectHeight})`)
      .call(xAxis);
  }
  private drawAxis() {
    const svg = d3.select(this.svgRef2.nativeElement);//得到svg畫布
    const marge = { top: 60, bottom: 60, left: 60, right: 60 }
    svg.attr("width", "960");
    svg.attr("height", "600");
    const scaleLiner = d3.scaleLinear()
      .domain([0, d3.max(this.dataset)])
      .range([0, 250]);
    let g = svg.append("g")
    g.attr("transform", `translate(${marge.left},${marge.top})`);

    g.selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", `${marge.left}`)
      .attr("y", (d, i) => {
        return i * this.rectHeight;
      })
      .attr("width", (d) => {
        return scaleLiner(d);
      })
      .attr("height", this.rectHeight - 5)
      .attr("fill", "blue");

    //為坐標軸定義一個線性比例尺
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(this.dataset)])
      .range([0, 250]);
    //定義一個坐標軸
    const xAxis = d3.axisBottom(xScale)//定義一個axis,由bottom可知，是朝下的
      .ticks(7);//設置刻度數目
    g.append("g")
      .attr("transform", `translate(${marge.left},${this.dataset.length * this.rectHeight})`)
      .call(xAxis);
  }

}
