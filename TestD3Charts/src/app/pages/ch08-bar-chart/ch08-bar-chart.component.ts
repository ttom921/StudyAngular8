import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch08-bar-chart',
  templateUrl: './ch08-bar-chart.component.html',
  styleUrls: ['./ch08-bar-chart.component.scss']
})
export class Ch08BarChartComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20];
  constructor() { }

  ngOnInit() {
    this.drawChart();
  }
  private drawChart() {
    const width = 960;
    const height = 600
    const svg = d3.select(this.svgRef.nativeElement);//得到svg畫布
    //設定畫布
    svg.attr("width", width);
    svg.attr("height", height);
    const marge = { top: 60, bottom: 60, left: 60, right: 60 };
    let g = svg.append("g");
    g.attr("transform", `translate(${marge.left},${marge.top})`);
    //y方向
    const yScale = d3.scaleLinear()
      .domain([d3.max(this.dataset), 0])
      .range([0, height - marge.top - marge.bottom]);
    const yAxis = d3.axisLeft(yScale);
    g.call(yAxis);
    //x方向
    //console.log(yScale(0));
    g = svg.append("g");
    g.attr("transform", `translate(${marge.left},${marge.top + yScale(0)})`);
    const xScale = d3.scaleBand()
      .domain(d3.range(0, this.dataset.length).map(String))//轉換成字串
      .rangeRound([0, width - marge.left - marge.right]);

    const xAxis = d3.axisBottom(xScale);
    g.call(xAxis);
    //繪制矩形
    const rectPadding = 20;//矩形之間間隙
    g = svg.append("g");
    g.attr("transform", `translate(${marge.left},${marge.top})`);
    const gs = g.selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("g");

    gs.append("rect")
      .attr("x", (d: any, i: any) => {
        // console.log("d=" + d);
        // console.log("xScale(i)=" + xScale(i) + " i=" + i);
        return marge.left + xScale(i) - xScale.step() / 2;
      })
      .attr("y", (d: any, i) => {
        return yScale(d);
      })
      .attr("width", () => {
        return xScale.step() - rectPadding;
      })
      .attr("height", (d: any) => {
        return height - marge.top - marge.bottom - yScale(d);
      })
      .attr("fill", "blue");
    //繪制文字
    gs.append("text")
      .attr("x", (d, i: any) => {
        return marge.left + xScale(i) - xScale.step() / 2;
      })
      .attr("y", (d) => {
        return yScale(d);
      })
      .attr("dx", () => {
        //console.log(xScale.step());
        return (xScale.step() - rectPadding) / 2;
      })
      .attr("dy", "20")
      .text((d) => {
        return d;
      });
  }
}
