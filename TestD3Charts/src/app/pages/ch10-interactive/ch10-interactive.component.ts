import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch10-interactive',
  templateUrl: './ch10-interactive.component.html',
  styleUrls: ['./ch10-interactive.component.scss']
})
export class Ch10InteractiveComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20];
  constructor() { }

  ngOnInit() {
    this.drawChart();
  }
  private drawChart() {
    //計算顏色
    const colors = d3.scaleLinear().domain([0, this.dataset.length]).range(<any[]>["red", "yellow"]);
    //const colors = d3.scaleLinear().domain([0, this.dataset.length]).range(<any[]>['red', 'blue']);
    console.log("colors=" + colors(0));
    //svg 畫布大小
    const width = 860;
    const height = 500;

    //得到svg畫布
    const svg = d3.select(this.svgRef.nativeElement);
    //設定svg畫布大小
    svg.attr("width", width);
    svg.attr("height", height);
    const marge = { top: 60, bottom: 60, left: 60, right: 60 };
    //設定y坐標軸
    const gay = svg.append("g");
    gay.attr("transform", `translate(${marge.left},${marge.top})`);
    //y軸比例央
    const yScale = d3.scaleLinear()
      .domain([d3.max(this.dataset), 0])
      .range([0, height - marge.top - marge.bottom]);
    const yAxis = d3.axisLeft(yScale);
    gay.call(yAxis);
    //設定x坐標軸
    // const xband = d3.range(0, this.dataset.length).map(String);//轉成字串陣列
    // console.log(xband);
    const gax = svg.append("g");
    gax.attr("transform", `translate(${marge.left},${marge.top + yScale(0)})`);
    //設定x比例尺
    const xScale = d3.scaleBand()
      .domain(d3.range(0, this.dataset.length).map(String))
      .rangeRound([0, width - marge.left - marge.right]);
    const xAxis = d3.axisBottom(xScale);
    gax.call(xAxis);
    //繪制矩形
    const rectPadding = 20;//矩形之間間隙
    const g = svg.append("g");
    g.attr("transform", `translate(${marge.left},${marge.left})`);
    const gs = g.selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("g");
    gs.append("rect")
      .attr("x", (d, i: any) => {
        // console.log("d=" + d);
        // console.log("xScale(i)=" + xScale(i) + " i=" + i);
        return marge.left + xScale(i) - xScale.step() / 2
      })
      .attr("y", (d) => {
        return yScale(d);
      })
      .attr("width", () => {
        return xScale.step() - rectPadding;
      })
      .attr("height", (d) => {
        return height - marge.top - marge.bottom - yScale(d);
      })
      .attr("fill", (d, i) => colors(i))
      .on("mouseover", function () {
        const rect = d3.select(this);
        rect
          .transition()
          .duration(300)
          .attr("fill", "blue");
        //console.log(this);
      })
      .on("mouseout", function (d, i) {
        const rect = d3.select(this);
        rect
          .transition()
          .delay(300)
          .duration(300)
          .attr("fill", colors(i));
      })
      ;
    //繪制文字
    gs.append("text")
      .attr("x", (d, i: any) => {
        return marge.left + xScale(i) - xScale.step() / 2;
      })
      .attr("y", (d) => {
        return yScale(d);
      })
      .attr("dx", () => {
        return (xScale.step() - rectPadding) / 2;
      })
      .attr("dy", "20")
      .text((d) => d);

  }

}
