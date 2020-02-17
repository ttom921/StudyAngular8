import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { STOCKS } from 'src/app/share/data/stocks';
import { fromEvent } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  //encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent implements OnInit, AfterViewInit {


  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  loading = false;
  dataset = [];
  private margin = { top: 20, right: 40, bottom: 20, left: 20 };
  width: number;
  height: number;
  //svg的相關設定
  chartWidth: number;
  chartHeight: number;
  chartLeftGap: number;
  chartBottomGap: number;
  constructor() {
    this.chartLeftGap = 20;
    this.chartBottomGap = 0;
    this.dataset = STOCKS;
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //選到svg標籤
    const svg = d3.select(this.svgRef.nativeElement);
    this.drawChart(svg);
    //視窗有resize的事件
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

    //console.log(colors(0));

    this.initSvg(svg, false);
    const xScale = this.initXAxis(svg);
    const yScale = this.initYAxis(svg);
    this.drawLine(svg, xScale, yScale);
  }
  drawLine(svg: any, xScale: any, yScale: any) {
    //計算顏色
    const colors = d3.scaleLinear().domain([0, this.dataset.length]).range(<any[]>['red', 'blue']);
    const line = d3.line()
      .x((d: any) => xScale(d.date))
      .y((d: any) => (yScale(d.value)))
      //.curve(d3.curveMonotoneX)
      ;
    svg.append('g')
      .attr('transform', `translate(${this.margin.left + this.chartLeftGap}, ${this.margin.top})`)
      .append('path')
      .datum(STOCKS)
      .attr('fill', 'none')
      .attr('stroke', "red")
      .attr('stroke-width', "red")
      //.attr('stroke-linejoin', 'round')
      //.attr('stroke-linecap', 'round')
      .attr('class', 'line')
      .attr('d', line);

  }

  initYAxis(svg: any) {
    const midheight = this.margin.top + this.margin.bottom;

    //y方向的座標的設定
    let yScale = d3.scaleLinear()
      //.domain([0, maxValue])
      .domain(d3.extent(STOCKS, (d) => d.value))
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
    //x方向的座標的設定
    const midwidth = this.margin.left + this.margin.right;
    const minheight = this.margin.bottom + this.chartBottomGap;
    let xScale = d3.scaleTime()
      //.domain([0, this.dataset.length])
      .domain(d3.extent(STOCKS, (d) => d.date))
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
