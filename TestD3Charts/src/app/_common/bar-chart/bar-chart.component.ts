import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  @Input() private data: Array<any>;
  private margin: { top: number, left: number } = { top: 2, left: 2 };
  private width: number;
  private height: number;
  private chartWidth: number;
  private chartHeight: number;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  loading = false;
  constructor() {

    //
    this.generateData();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //可以取得寬高
    // const data = this.chartContainer.nativeElement.getBoundingClientRect();
    // console.log(data);
    //計算寬高margin
    this.calWidthHeightMargin();
    const svg = d3.select(this.svgRef.nativeElement);
    this.drawChart(svg, this.width, this.height, this.margin, this.data);
    this.updateChart();
  }
  //
  calWidthHeightMargin() {
    const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.margin.left = Math.min(Math.max(width * 0.1, 20), 50);
    this.margin.top = Math.min(Math.max(height * 0.1, 20), 50);
    //this.margin = 2;
    let fmt = `w=${this.width},h=${this.height},m.top=${this.margin.top},m.left=${this.margin.left}`;
    console.log(fmt);
  }
  drawChart(svg: any, width: number, height: number, margin: any, data: any[]) {
    this.chartWidth = width - 2 * margin.left;
    this.chartHeight = height - 2 * margin.top;
    const n = data[0].length;
    const maxValue = this.getMaxValue(data);
    let fmt = `chartWidth=${this.chartWidth} chartHeight=${this.chartHeight}`;
    console.log(fmt);
    //
    svg
      .attr('viewBox', `0 0 ${this.chartWidth} ${this.chartHeight}`)
      .attr('preserveAspectRatio', 'xMinYMin');

    svg.selectAll('g').remove();

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top - 40})`);

    // define X & Y domains
    const xDomain = this.data.map(d => d[0]);
    const yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.chartWidth - this.margin.left * 2]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.chartHeight, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartHeight - 40})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top - 40})`)
      .call(d3.axisLeft(this.yScale));
  }
  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.chartHeight - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.chartHeight - this.yScale(d[1]));
  }
  //
  private getMaxValue(series: { data: number }[][]): number {
    return series.reduce((serieMax, serie) => {
      return Math.max(serieMax, serie.reduce((max, value) => Math.max(max, value.data), -Infinity))
    }, -Infinity);
  }
  //測試
  // private generateData(n, maxValue) {
  //   return new Array(n).fill(null).map(() => ({ data: Math.random() * maxValue }))
  // }
  generateData() {
    this.data = [];
    //for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    for (let i = 0; i < (8); i++) {
      this.data.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
