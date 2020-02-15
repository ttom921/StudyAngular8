import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import * as d3 from 'd3';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  loading = false;
  @Input() dataset = [];
  private margin: number;
  private width: number;
  private height: number;
  private chartWidth: number;
  private chartHeight: number;
  // private xScale: any;
  // private yScale: any;
  //private colors: any;
  // private xAxis: any;
  // private yAxis: any;
  constructor() {
    //this.generaterTestData();
    this.margin = 20;
  }
  generaterTestData() {
    for (let i = 0; i < (8); i++) {
      this.dataset.push(Math.floor(Math.random() * 80));
    }
  }
  ngOnInit() {

  }
  ngOnChanges() {
    if (this.dataset) {
      const svg = d3.select(this.svgRef.nativeElement);
      //console.log(svg);
      if (svg != null) {
        //this.calWidthHeightMargin();
        this.drawChart(svg);
      }
    }
  }
  ngAfterViewInit(): void {
    //this.calWidthHeightMargin();
    const svg = d3.select(this.svgRef.nativeElement);
    this.drawChart(svg);
    fromEvent(window, 'resize')
      .pipe(
        tap(() => this.loading = true),
        debounceTime(300)
      )
      .subscribe(() => {
        //this.calWidthHeightMargin();
        this.drawChart(svg);
        this.loading = false;
      });

  }
  private drawChart(svg: any) {
    this.calWidthHeightMargin();
    const maxValue = d3.max(this.dataset);
    //計算顏色
    const colors = d3.scaleLinear().domain([0, this.dataset.length]).range(<any[]>['red', 'blue']);
    // Create our SVG container
    svg
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .attr('preserveAspectRatio', 'xMinYMin');
    svg.selectAll('g').remove();
    //x方向的座標的設定
    var xScale = d3.scaleLinear()
      .domain([0, this.dataset.length])
      .range([0, this.chartWidth]);
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${this.margin}, ${this.chartHeight + this.margin})`)
      .call(d3.axisBottom(xScale));
    //y方向的座標的設定
    var yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, this.chartHeight]);

    var yScale2 = d3.scaleLinear()
      .domain([0, maxValue])
      .range([this.chartHeight, 0]);

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.margin}, ${this.margin})`)
      .call(d3.axisLeft(yScale2).ticks(Math.min(Math.floor(this.chartHeight / 20), maxValue)));
    //建立bar
    var bars = svg.append('g')
      .attr('class', 'bars');

    // Bind data to chart, and create bars
    bars.selectAll('rect')
      .data(this.dataset)
      .enter()
      .append('rect')
      .style('fill', (d, i) => colors(i))
      .attr('x', (d, i) => xScale(i) + this.margin)
      .attr('y', (d) => this.chartHeight + this.margin - yScale(d))//使正常顯示
      .attr('width', 20)
      .attr('height', (d, i) => {
        return yScale(d);//比例放大顯示
      });
  }
  //計算寬高
  private calWidthHeightMargin() {
    const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
    this.width = width;
    this.height = height;

    this.chartWidth = width - 2 * this.margin;
    this.chartHeight = height - 2 * this.margin;

    // let fmt = `w=${this.width},h=${this.height},margin=${this.margin}`;
    // console.log(fmt);
  }
}
