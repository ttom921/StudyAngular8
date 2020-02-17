import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { TEMPERATURES } from 'src/app/share/data/temperatures';
import { curveBasis } from 'd3';
@Component({
  selector: 'app-multi-series',
  templateUrl: './multi-series.component.html',
  styleUrls: ['./multi-series.component.scss']
})
export class MultiSeriesComponent implements OnInit, AfterViewInit {

  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  loading = false;
  dataset: any;
  private margin = { top: 20, right: 40, bottom: 20, left: 20 };
  width: number;
  height: number;
  //svg的相關設定
  chartWidth: number;
  chartHeight: number;
  chartLeftGap: number;
  chartBottomGap: number;
  arydate: any;
  constructor() {
    this.chartLeftGap = 20;
    this.chartBottomGap = 0;
    //資料轉換
    //var parseDate = d3.timeFormat("%Y-%m-%d")
    //this.arydate = TEMPERATURES.map((v) => v.values.map((v) => parseDate(v.date)))[0];
    this.arydate = TEMPERATURES.map((v) => v.values.map((v) => v.date))[0];
    this.dataset = TEMPERATURES;
    //console.log(TEMPERATURES);
    //console.log(this.arydate);
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //選到svg標籤
    const svg = d3.select(this.svgRef.nativeElement);
    this.drawChart(svg);
  }
  private drawChart(svg: any) {
    this.calWidthHeightMargin();
    this.initSvg(svg, true);
    const xScale = this.initXAxis(svg);
    const yScale = this.initYAxis(svg);
    const zScale = this.initZAxis(svg);

    this.drawLine(svg, xScale, yScale, zScale);
  }
  drawLine(svg: any, xScale: d3.ScaleTime<number, number>, yScale: d3.ScaleLinear<number, number>, zScale: d3.ScaleOrdinal<string, string>) {

    const line = d3.line()
      .curve(d3.curveBasis)
      .x((d: any) => xScale(d.date))
      .y((d: any) => (yScale(d.temperature)))
      ;

    const colors = ['steelblue', 'orange', 'red'];
    let g = svg.append('g');
    this.dataset.forEach((d, i) => {
      //console.log(d);
      g.attr('transform', `translate(${this.margin.left + this.chartLeftGap}, ${this.margin.top})`)
        .append('path')
        .datum(d)
        .attr('fill', 'none')
        .attr('stroke', colors[i])
        //.attr('stroke-width', 3)
        //.attr('stroke-linejoin', 'round')
        //.attr('stroke-linecap', 'round')
        .attr('class', 'line')
        .attr('d', (d) => line(d.values))
        ;
      //文字
      g.append('text')
        .datum(d)
        //.attr('transform', (d) => 'translate(' + xScale(d.values[d.values.length - 1].date) + ',' + yScale(d.values[d.values.length - 1].temperature) + ')')
        .attr('transform', (d) => `translate(${xScale(d.values[d.values.length - 1].date) - this.chartLeftGap * 2}, ${yScale(d.values[d.values.length - 1].temperature)} )`)
        .attr('x', 3)
        .attr('dy', '0.35em')
        .style('font', '10px sans-serif')
        .text(function (d) { return d.id; });

    });
    // this.dataset.forEach((d, i) => {
    //   console.log(d);
    //   g.append('text')
    //     .datum(d)
    //     .attr('transform', (d) => 'translate(' + xScale(d.values[d.values.length - 1].date) + ',' + yScale(d.values[d.values.length - 1].temperature) + ')')
    //     .attr('x', 3)
    //     .attr('dy', '0.35em')
    //     .style('font', '10px sans-serif')
    //     .text(function (d) { return d.id; });
    // });
    // let city = svg.selectAll('.city')
    //   .data(TEMPERATURES)
    //   .enter().append('g')
    //   .attr('transform', `translate(${this.margin.left + this.chartLeftGap}, ${this.margin.top})`)
    //   .attr('class', 'city');
    // city.append('path')
    //   .attr('class', 'line')
    //   .attr('d', (d) => line(d.values))
    //   .style('stroke', (d) => zScale(d.id));

    // city.append('text')
    //   .datum(function (d) { return { id: d.id, value: d.values[d.values.length - 1] }; })
    //   .attr('transform', (d) => 'translate(' + xScale(d.value.date) + ',' + yScale(d.value.temperature) + ')')
    //   .attr('x', 3)
    //   .attr('dy', '0.35em')
    //   .style('font', '10px sans-serif')
    //   .text(function (d) { return d.id; });
  }
  initZAxis(svg: any) {
    let zScale = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(TEMPERATURES.map(function (c) { return c.id; }))
      ;
    return zScale;
  }
  initYAxis(svg: any) {
    const midheight = this.margin.top + this.margin.bottom;

    //y方向的座標的設定
    let yScale = d3.scaleLinear()
      //.domain([0, maxValue])
      .domain([
        d3.min(TEMPERATURES, function (c) { return d3.min(c.values, function (d) { return d.temperature; }); }),
        d3.max(TEMPERATURES, function (c) { return d3.max(c.values, function (d) { return d.temperature; }); })
      ])
      .range([this.chartHeight - midheight, 0]);

    // var yScale2 = d3.scaleLinear()
    //   .domain([0, maxValue])
    //   .range([this.chartHeight, 0]);
    //畫Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.margin.left + this.chartLeftGap}, ${this.margin.top - this.chartBottomGap})`)
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('x', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
    return yScale;
  }
  private initXAxis(svg: any) {

    //const svgData2 = d3.data(this.dataset)
    //x方向的座標的設定
    const midwidth = this.margin.left + this.margin.right;
    const minheight = this.margin.bottom + this.chartBottomGap;
    let xScale = d3.scaleTime()
      //.domain([0, this.dataset.length])
      .domain(d3.extent(this.arydate, (d: Date) => d))
      .range([0, this.chartWidth - midwidth]);
    //畫X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${this.margin.left + this.chartLeftGap}, ${this.chartHeight - minheight})`)
      .call(d3.axisBottom(xScale))

      ;
    return xScale;
  }
  private initSvg(svg: any, visiable = false) {
    //建立svg
    svg
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight)
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    svg.selectAll('g').remove();
    // //查看大小
    if (visiable == false) return;
    svg.append('g').append('rect')
      .style('fill', 'purple')
      .style('fill-opacity', 0.1)
      .style('stroke', 'purple')
      .style('stroke-width', 10)
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight);
  }

  //計算寬高
  private calWidthHeightMargin() {
    const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.chartWidth = width - this.margin.left - this.margin.right;
    this.chartHeight = height - this.margin.top - this.margin.bottom;
  }
}
