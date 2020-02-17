import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-gsensor-info',
  templateUrl: './gsensor-info.component.html',
  styleUrls: ['./gsensor-info.component.scss']
})
export class GsensorInfoComponent implements OnInit, AfterViewInit {


  //取得html的元件
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  loading = false;
  dataset = [];
  private margin = { top: 8, right: 32, bottom: 8, left: 32 };
  //最上層的寬高
  width: number;
  height: number;
  //svg的相關設定
  chartWidth: number;//畫圖的區域
  chartHeight: number;
  //顯示的偏移值
  chartheightGap: number;
  //
  tSecond: number;//全部秒數
  //g-sendor的值
  showMinVal = -1;
  showMaxVal = 1;
  showMinVal2 = -5;
  showMaxVal2 = 5;

  gxColor = "#FF6666";
  gyColor = "#77FF77";
  gzColor = "#9999FF";

  constructor() {
    // this.chartLeftGap = 20;
    // this.chartBottomGap = 0;
    this.testGeneraterGsensordata();
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
    const hScale = this.inieHAxis(svg);
    const xScale = this.initXAxis(svg, hScale);
    this.initYAxis(svg, hScale);

    this.drawLine(svg, xScale, hScale);
  }
  drawLine(svg: any, xScale: any, hScale: any) {

    const gxline = d3.line()
      //.curve(d3.curveBasis)
      .x((d: any) => xScale(d.date))
      .y((d: any) => hScale(d.gx))
      ;
    const gyline = d3.line()
      //.curve(d3.curveBasis)
      .x((d: any) => xScale(d.date))
      .y((d: any) => hScale(d.gy))
      ;
    const gzline = d3.line()
      //.curve(d3.curveBasis)
      .x((d: any) => xScale(d.date))
      .y((d: any) => hScale(d.gz))
      ;

    const colors = [this.gxColor, this.gyColor, this.gzColor];
    const lines = [gxline, gyline, gzline]
    let ypos = this.margin.top;
    for (let i = 0; i < 3; i++) {
      let g = svg.append('g');
      let xpos = this.margin.left;
      g.attr('transform', `translate(${xpos}, ${ypos})`)
        .append('path')
        .datum(this.dataset)
        .attr('fill', 'none')
        .attr('stroke', colors[i])
        .attr('class', 'line')
        .attr('d', lines[i]);
      ypos += this.chartheightGap;
    }

    // let g = svg.append('g');
    // g.attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 0})`)
    //   .append('path')
    //   .datum(this.dataset)
    //   .attr('fill', 'none')
    //   .attr('stroke', this.gxColor)
    //   .attr('class', 'line')
    //   .attr('d', gxline);
    // g = svg.append('g');
    // g.attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 1})`)
    //   .append('path')
    //   .datum(this.dataset)
    //   .attr('fill', 'none')
    //   .attr('stroke', this.gyColor)
    //   .attr('class', 'line')
    //   .attr('d', gyline);

    // g = svg.append('g');
    // g.attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 2})`)
    //   .append('path')
    //   .datum(this.dataset)
    //   .attr('fill', 'none')
    //   .attr('stroke', this.gzColor)
    //   .attr('class', 'line')
    //   .attr('d', gzline);


  }
  //計算顯示的偏移值y的座標
  inieHAxis(svg: any) {
    //this.chartHeight
    let hScale = d3.scaleLinear().domain([this.showMinVal, this.showMaxVal]).range([this.chartHeight / 6, 0]).clamp(true);
    return hScale;
  }
  initYAxis(svg: any, hScale: any) {

    const midheight = this.margin.top + this.margin.bottom;


    let yAxis = d3.axisLeft(hScale).ticks(2).tickSize(5);

    //畫Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 0})`)
      .call(yAxis)

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 1})`)
      .call(yAxis)

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 2})`)
      .call(yAxis)

    //return yAxis;

    //_self.yAxis2 = d3.axisLeft(_self.y2).ticks(7).tickSize(5);
    //let yAxis2 = d3.axisLeft(_self.y2).ticks(3).tickSize(1);

    //y方向的座標的設定
    //    _self.y2 = d3.scaleLinear().domain([-_self.zoomScale[_self.zoomIndex], _self.zoomScale[_self.zoomIndex]]).range([height - 50, 0]).clamp(true);

    // _self.y = d3.scaleLinear().domain([_self.showMinVal, _self.showMaxVal]).range([height / 6, 0]).clamp(true);
    // let yScale = d3.scaleLinear()
    //   .domain([this.showMaxVal, this.showMaxVal])
    //   .range([(this.chartheightGap), 0])
    //   .clamp(true)
    //   ;
    // let yScale2 = dt.scaleLinear()
    //   .domain([-_self.zoomScale[_self.zoomIndex], _self.zoomScale[_self.zoomIndex]]))
    // .range[this.chartHeight - midheight - 50, 0]
    //   .clame(true)
    //   ;
    //畫Y Axis
    //   .range([this.chartHeight, 0]);
    // let yAxis = d3.axisLeft(yScale).ticks(2).tickSize(5);
    // svg.append('g')
    //   .attr('class', 'y axis')
    //   .attr('transform', `translate(${this.margin.left}, ${yScale(0)})`)
    //   .call(yAxis)

    // return yScale;
  }
  initXAxis(svg: any, hScale: any) {
    //x方向的座標的設定
    const midwidth = this.margin.left + this.margin.right;

    let xScale = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]);
    let xScaleClamp = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]).clamp(true);
    //let fmt = `xScaleClamp=${xScaleClamp}`;
    //console.log(fmt);
    //_self.xAxis = d3.axisBottom(_self.x).ticks(10).tickSize(10).tickPadding(10).tickFormat("");
    //畫X Axis
    //不顯示數字
    let xAxis = d3.axisBottom(xScale).ticks(10).tickSize(10).tickPadding(10).tickFormat((d) => '');
    //console.log(`${hScale(0)},${hScale(1)},${hScale(2)}`)
    //畫第一組gx
    svg.append('g')
      .attr('class', 'x axis')
      .attr("stroke-dasharray", "2,2")
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 0})`)
      .call(xAxis)
      ;
    //畫第二組gy
    svg.append('g')
      .attr('class', 'x axis')
      .attr("stroke-dasharray", "2,2")
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 1})`)
      .call(xAxis)
      ;
    //畫第二組gz
    svg.append('g')
      .attr('class', 'x axis')
      .attr("stroke-dasharray", "2,2")
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 2})`)
      .call(xAxis)
      ;
    return xScale;
  }
  //初始化svg
  private initSvg(svg: any, visiable = false) {
    //建立svg
    svg
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight)
      .attr('transform', `translate(0, 0)`);
    svg.selectAll('g').remove();
    // //查看大小
    if (visiable == false) return;
    svg.append('g').append('rect')
      .style('fill', 'purple')
      .style('fill-opacity', 0.1)
      .style('stroke', 'purple')
      .style('stroke-width', 4)
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

    this.chartheightGap = this.chartHeight / ((2 * 2) + 1); //寬度/(2n+1)
    console.log(this.chartheightGap);
  }
  //以下是測試
  testGeneraterGsensordata() {
    this.tSecond = 60 * 60;
    //----------------------Test Data------------------------
    for (var i = 0; i < this.tSecond; i++) {
      let rX = d3.randomUniform(-0.3, 0.3)();
      let rY = d3.randomUniform(-0.8, 0.1)();
      let rZ = d3.randomUniform(-0.1, 0.3)();
      let obj = { "date": i, "utc": 9999999999, "gx": rX, "gy": rY, "gz": rZ };
      this.dataset.push(obj);
    }
  }
}
