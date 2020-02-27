import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { appendFile } from 'fs';
@Component({
  selector: 'app-ch09-barchar-ani',
  templateUrl: './ch09-barchar-ani.component.html',
  styleUrls: ['./ch09-barchar-ani.component.scss']
})
export class Ch09BarcharAniComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  dataset = [10, 20, 30, 23, 13, 40, 27, 35, 20];
  constructor() { }

  ngOnInit() {
    this.drawChart();
  }
  private drawChart() {
    //svg畫布大小
    const width = 960;
    const height = 600;
    //得到svg畫布
    const svg = d3.select(this.svgRef.nativeElement);
    //設定svg畫布大小
    svg.attr("width", width);
    svg.attr("height", height);
    const marge = { top: 60, bottom: 60, left: 60, right: 60 };
    //設定y坐標軸
    const gay = svg.append("g");
    gay.attr("transform", `translate(${marge.left},${marge.top})`);
    //y軸比例尺
    const yScale = d3.scaleLinear()
      .domain([d3.max(this.dataset), 0])
      .range([0, height - marge.top - marge.bottom]);
    const yAxis = d3.axisLeft(yScale);
    gay.call(yAxis);
    //設定x坐標軸
    const gax = svg.append("g");
    gax.attr("transform", `translate(${marge.left},${marge.top + yScale(0)})`);
    //x軸比例尺
    //const xband = d3.range(0, this.dataset.length).map(String);//轉成字串陣列
    //console.log(xband);
    const xScale = d3.scaleBand()
      .domain(d3.range(0, this.dataset.length).map(String))
      .rangeRound([0, width - marge.left - marge.right]);
    const xAxis = d3.axisBottom(xScale);
    gax.call(xAxis);
    //繪制矩形
    const rectPadding = 20;//矩形之間間隙
    const g = svg.append("g");
    g.attr("transform", `translate(${marge.left},${marge.top})`);
    const gs = g.selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("g");
    gs.append("rect")
      .attr("x", (d, i: any) => {
        // console.log("d=" + d);
        // console.log("xScale(i)=" + xScale(i) + " i=" + i);
        return marge.left + xScale(i) - xScale.step() / 2;
      })
      .attr("y", (d) => {//這里是要變變的，即初始狀態
        var min = yScale.domain()[0];
        return yScale(min);//可以得知，這里返品的是最大值
      })
      .attr("width", () => {
        return xScale.step() - rectPadding;
      })
      .attr("height", (d) => {//這里要變變，即初始狀態
        return 0;
        //return height - marge.top - marge.bottom - yScale(d);
      })
      .attr("fill", "blue")
      .transition()//添加過渡
      .duration(2000)//持續時間
      .delay((d, i) => {//延遲
        return i * 300;
      })
      //.ease(d3.easeElasticInOut)//可以將注䆁去掉，看看效果(chrome會報錯，但是不影響效果)
      .attr("y", (d) => {//回到最終狀態
        return yScale(d);
      })
      .attr("height", (d) => {//回到最終狀態
        return height - marge.top - marge.bottom - yScale(d);
      })
      ;
    //繪制文字
    gs.append("text")
      .attr("x", (d, i: any) => {
        return marge.left + xScale(i) - xScale.step() / 2
      })
      .attr("y", (d) => {
        let min = yScale.domain()[0];
        return yScale(min);
      })
      .attr("dx", () => {
        //console.log(xScale.step());
        return (xScale.step() - rectPadding) / 2;
      })
      .attr("dy", "20")
      .text((d) => {
        return d;
      })
      .transition()
      .duration(2000)
      .delay((d, i) => {
        return i * 400;
      })
      //.ease(d3.easeElasticInOut)//可以將注䆁去掉，看看效果(chrome會報錯，但是不影響效果)
      .attr("y", (d) => {
        return yScale(d);
      });
  }
}
