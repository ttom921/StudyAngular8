import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { fromEvent } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-test-bar-chart',
  templateUrl: './test-bar-chart.component.html',
  styleUrls: ['./test-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestBarChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  loading = false;
  //svg相關
  private svg: any;
  //div的大小可變
  private width: number;
  private height: number;
  private margin = { top: 8, right: 10, bottom: 32, left: 20 };
  //svg viewbox的大小
  private viewboxWidth = 800;
  private viewboxHeight = 100;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //選到svg標籤
    this.svg = d3.select(this.svgRef.nativeElement);
    this.drawChart();
  }
  //計算寬高
  private calWidthHeightMargin() {
    const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
  }
  //初始化svg
  private initSvg(visiable = false) {
    //建立svg
    let svg = this.svg;
    svg
      .attr("width", this.width)
      .attr("height", this.height)
      .attr('viewBox', `0 0 ${this.viewboxWidth} ${this.viewboxHeight}`)
      .attr('preserveAspectRatio', 'xMinYMid')
      ;
    svg.selectAll('g').remove();
    //視窗有resize的事件
    fromEvent(window, 'resize')
      .pipe(
        tap(() => this.loading = true),
        debounceTime(300)
      )
      .subscribe(() => {
        //this.calWidthHeightMargin();
        this.drawChart();
        this.loading = false;
      });
    // //查看大小
    if (visiable == false) return;
    svg.append('g').append('rect')
      .style('fill', 'purple')
      .style('fill-opacity', 0.1)
      .style('stroke', 'purple')
      .style('stroke-width', 4)
      .attr('width', this.width)
      .attr('height', this.height);
  }
  drawChart() {
    this.calWidthHeightMargin();
    this.initSvg(true);
    let svg = this.svg;
    // const chartWidth = width - 2 * margin;
    // const chartHeight = height - 2 * margin;

    // Set of data
    var dataset = [5, 2, 9, 4, 5, 6, 7];
    // bar colors
    const colors = d3.scaleLinear().domain([0, dataset.length]).range(<any[]>['red', 'blue']);
    const n = dataset.length;
    const maxValue = d3.max(dataset);


    //x方向的座標的設定
    //X的對映
    var xScale = d3.scaleLinear()
      .domain([0, dataset.length - 1])
      .range([0, this.viewboxWidth]);
    //x軸的顯示設定
    //this.xAxis = d3.axisBottom(xScale).ticks(10).tickSize(10).tickPadding(10).tickFormat((d: any) => (d / this.gsensorgen) + 's');
    const xAxis = d3.axisBottom(xScale).ticks(dataset.length - 1).tickSize(10).tickPadding(10).tickFormat((d: any, i: any) => i);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${this.margin.left}, ${this.viewboxHeight - this.margin.bottom})`)
      .call(xAxis);

    //y方向的座標的設定
    const subheight = this.margin.top + this.margin.bottom;
    var yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, this.viewboxHeight - subheight]);

    var yScale2 = d3.scaleLinear()
      .domain([0, maxValue])
      .range([this.viewboxHeight - subheight, 0]);
    const yAxis = d3.axisLeft(yScale2).ticks(Math.min(Math.floor(this.viewboxHeight / 50), maxValue));
    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(yAxis);

    // //建立bar
    var bars = svg.append('g')
      .attr('class', 'bars');

    //Bind data to chart, and create bars
    bars.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .style('fill', (d, i) => colors(i))
      .attr('x', (d, i) => xScale(i) + this.margin.left / 2)
      .attr('y', (d) => this.viewboxHeight - this.margin.bottom - yScale(d))//使正常顯示
      .attr('width', 20)
      .attr('height', (d, i) => {
        return yScale(d);//以比例顯示
      });
  }
}
