import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-gsensor-info',
  templateUrl: './gsensor-info.component.html',
  styleUrls: ['./gsensor-info.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  currentSec: number;//目前秒數
  //g-sendor的值
  showMinVal = -1;
  showMaxVal = 1;
  showMinVal2 = -5;
  showMaxVal2 = 5;

  gxColor = "#FF6666";
  gyColor = "#77FF77";
  gzColor = "#9999FF";

  xScale: any
  xScaleClamp: any;
  hScale: any;

  //drag: any;
  constructor() {
    // this.chartLeftGap = 20;
    // this.chartBottomGap = 0;
    this.testGeneraterGsensordata();



  }
  private dragsartEvent(handle: any) {
    //console.log(d3.event);
    console.log(d3.event.x);
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

    //計算各個參數
    const midwidth = this.margin.left + this.margin.right;
    //Y的對映
    const hScale = this.inieHAxis(svg);
    //X的對映
    const xScale = this.xScale = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]);
    this.xScaleClamp = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]).clamp(true);
    //x軸
    let xAxis = d3.axisBottom(xScale).ticks(10).tickSize(10).tickPadding(10).tickFormat((d) => '');
    //y軸
    let yAxis = d3.axisLeft(hScale).ticks(2).tickSize(5);
    //_self.y2 = d3.scaleLinear().domain([-_self.zoomScale[_self.zoomIndex], _self.zoomScale[_self.zoomIndex]]).range([height - 50, 0]).clamp(true);
    //_self.yAxis2 = d3.axisLeft(_self.y2).ticks(3).tickSize(1);
    const colors = [this.gxColor, this.gyColor, this.gzColor];

    //路徑對映計算
    const lines = this.pathcMapCal(xScale, hScale, this.xScaleClamp);

    //draw gxgraph
    const gxgraph = svg.append("g");
    gxgraph
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 0})`)
      ;
    this.drawGValue(gxgraph, 'x', hScale, yAxis, xAxis, lines[0], colors[0]);
    //畫 gygraph
    const gygraph = svg.append("g");
    gygraph
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 1})`)
      ;
    this.drawGValue(gygraph, 'y', hScale, yAxis, xAxis, lines[1], colors[1]);
    //畫 gzgraph
    const gzgraph = svg.append("g");
    gzgraph
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 2})`)
      ;
    this.drawGValue(gzgraph, 'z', hScale, yAxis, xAxis, lines[2], colors[2]);

    //畫sidebar
    this.drawSideBar(svg, this.xScaleClamp);

  }
  //畫sidebar
  private drawSideBar(svg: any, xScaleClamp: any) {


    const parent = this;
    let x2Scale = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth]).clamp(true);
    var slider = svg.append("g")
      .attr("class", "slider")
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 4})`)
      //.attr('transform', `translate(${this.margin.left},  ${this.margin.top + this.hScale(0)})`)
      ;
    //slider bar
    slider.append("line")
      .attr("class", "track")
      .attr("x1", xScaleClamp.range()[0])
      .attr("x2", xScaleClamp.range()[1])
      //複制line的線段
      .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
      .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .call(d3.drag()
        .on("drag", this.dragged())
      )
      ;

    //slide bar上的圖按鍵
    const btncircle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);
    //console.log(btncircle);
    //slide bar上的直線
    const btnline = slider.append("line", ".track-overlay")
      .attr("class", "trackbar")
      //.style("opacity", 0)
      //.attr("y1", -135)
      .attr("y1", `${-this.chartheightGap * 4 + this.margin.top * 3}`)
      .attr("y2", `${-this.margin.top}`)
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("stroke", "#666")
      .attr("stroke-width", "2px")
  }

  private dragged(): (d, i) => void {
    return (d, i) => {
      //console.dir(this);
      //console.log(d3.event.x);
      //console.log(this.xScaleClamp.invert(d3.event.x));
      this.moveCircleLine(this.xScaleClamp.invert(d3.event.x));
    }
  }

  moveCircleLine(h) {
    //console.log(h);
    const btncircle = d3.select('.handle');
    //console.log(btncircle);
    btncircle.attr("cx", this.xScale(h));
    const btnline = d3.select('.trackbar');
    //console.log(btnline);
    btnline.attr("x1", this.xScaleClamp(h)).attr("x2", this.xScaleClamp(h));
    this.currentSec = Math.floor(h);

    //_self.svg.handle2.attr("x1", _self.x2(h)).attr("x2", _self.x2(h));
    //   _self.svg.handle.attr("cx", _self.x(h));
    //   //_self.svg.style("background-color", d3.hsl(h, 0.8, 0.8));
    //   _self.currentSec = Math.floor(h);
  }
  // dragged() {
  //   const btncircle = d3.select('handle');
  //   console.dir(this);
  //   //console.log(this.xScaleClamp.invert(d3.event.x));
  // }
  private drawGValue(selection: any, gType: any, hScale: any, yAxis: any, xAxis: any, gline: any, color: any, ) {
    //console.log("call drawGValue");
    //console.log(this.margin);

    //畫Y軸
    selection.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);
    //畫X軸
    selection.append("g")
      .attr("class", "axis axis--x")
      .attr("stroke-dasharray", "2,2")
      .attr("transform", "translate(0," + hScale(0) + ")")
      .call(xAxis);

    selection.append("path")
      .datum(this.dataset)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('class', 'line')
      .attr('d', gline);


  }
  private pathcMapCal(xScale: any, hScale: any, xScaleClamp: any) {
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
    const lines = [gxline, gyline, gzline];
    return lines;
  }
  // drawLine(svg: any, xScale: any, hScale: any) {

  //   const gxline = d3.line()
  //     //.curve(d3.curveBasis)
  //     .x((d: any) => xScale(d.date))
  //     .y((d: any) => hScale(d.gx))
  //     ;
  //   const gyline = d3.line()
  //     //.curve(d3.curveBasis)
  //     .x((d: any) => xScale(d.date))
  //     .y((d: any) => hScale(d.gy))
  //     ;
  //   const gzline = d3.line()
  //     //.curve(d3.curveBasis)
  //     .x((d: any) => xScale(d.date))
  //     .y((d: any) => hScale(d.gz))
  //     ;

  //   const colors = [this.gxColor, this.gyColor, this.gzColor];
  //   const lines = [gxline, gyline, gzline]
  //   let ypos = this.margin.top;
  //   for (let i = 0; i < 3; i++) {
  //     let g = svg.append('g');
  //     let xpos = this.margin.left;
  //     g.attr('transform', `translate(${xpos}, ${ypos})`)
  //       .append('path')
  //       .datum(this.dataset)
  //       .attr('fill', 'none')
  //       .attr('stroke', colors[i])
  //       .attr('class', 'line')
  //       .attr('d', lines[i]);
  //     ypos += this.chartheightGap;
  //   }

  // }

  // initYAxis(svg: any, hScale: any) {

  //   const midheight = this.margin.top + this.margin.bottom;


  //   let yAxis = d3.axisLeft(hScale).ticks(2).tickSize(5);

  //   //畫Y Axis
  //   svg.append('g')
  //     .attr('class', 'y axis')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 0})`)
  //     .call(yAxis)

  //   svg.append('g')
  //     .attr('class', 'y axis')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 1})`)
  //     .call(yAxis)

  //   svg.append('g')
  //     .attr('class', 'y axis')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.chartheightGap * 2})`)
  //     .call(yAxis)

  // }
  // initXAxis(svg: any, hScale: any) {
  //   //x方向的座標的設定
  //   const midwidth = this.margin.left + this.margin.right;

  //   let xScale = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]);
  //   let xScaleClamp = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]).clamp(true);
  //   //let fmt = `xScaleClamp=${xScaleClamp}`;
  //   //console.log(fmt);
  //   //_self.xAxis = d3.axisBottom(_self.x).ticks(10).tickSize(10).tickPadding(10).tickFormat("");
  //   //畫X Axis
  //   //不顯示數字
  //   let xAxis = d3.axisBottom(xScale).ticks(10).tickSize(10).tickPadding(10).tickFormat((d) => '');
  //   //console.log(`${hScale(0)},${hScale(1)},${hScale(2)}`)
  //   //畫第一組gx
  //   svg.append('g')
  //     .attr('class', 'x axis')
  //     .attr("stroke-dasharray", "2,2")
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 0})`)
  //     .call(xAxis)
  //     ;
  //   //畫第二組gy
  //   svg.append('g')
  //     .attr('class', 'x axis')
  //     .attr("stroke-dasharray", "2,2")
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 1})`)
  //     .call(xAxis)
  //     ;
  //   //畫第二組gz
  //   svg.append('g')
  //     .attr('class', 'x axis')
  //     .attr("stroke-dasharray", "2,2")
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 2})`)
  //     .call(xAxis)
  //     ;
  //   return xScale;
  // }
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
  //計算顯示的偏移值y的座標
  inieHAxis(svg: any) {
    //this.chartHeight
    this.hScale = d3.scaleLinear().domain([this.showMinVal, this.showMaxVal]).range([this.chartHeight / 6, 0]).clamp(true);
    return this.hScale;
  }
  //計算寬高
  private calWidthHeightMargin() {
    const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.chartWidth = parseInt(`${width - this.margin.left - this.margin.right}`);
    this.chartHeight = parseInt(`${height - this.margin.top - this.margin.bottom}`);

    this.chartheightGap = parseInt(`${this.chartHeight / ((2 * 2) + 1)}`); //寬度
    console.log(this.chartheightGap);
    console.log(` this.chartWidth=${this.chartWidth},this.chartHeight=${this.chartHeight}`);
  }
  //以下是測試
  testGeneraterGsensordata() {
    this.tSecond = 3600;//60 * 60;//3600
    //----------------------Test Data------------------------
    for (var i = 0; i < this.tSecond; i++) {
      let rX = d3.randomUniform(-0.3, 0.3)();
      let rY = d3.randomUniform(-0.8, 0.8)();
      let rZ = d3.randomUniform(-0.2, 0.2)();
      let obj = { "date": i, "utc": 9999999999, "gx": rX, "gy": rY, "gz": rZ };
      this.dataset.push(obj);
    }
    //console.log(this.dataset);
  }
}
