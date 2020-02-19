import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import { fromEvent } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

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
  gsensorScale = 1000;

  gFontSize = "12px";
  gxColor = "#FF6666";
  gyColor = "#77FF77";
  gzColor = "#9999FF";
  colors = [this.gxColor, this.gyColor, this.gzColor];

  xScale: any
  xAxis: any;
  xScaleClamp: any;
  hScale: any;

  yScale2: any;
  yAxis2: any;

  focusMode = "na";
  isOnceMode = false;
  zoomIndex = 5;
  zoomScale = [0.2, 0.5, 1, 2, 3, this.showMaxVal2];

  //drag: any;
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
  setDurationTime(second) {
    this.moveCircleLine(second);
  }
  private drawChart(svg: any) {
    this.calWidthHeightMargin();
    this.initSvg(svg, false);

    //計算各個參數
    const midwidth = this.margin.left + this.margin.right;
    //Y的對映
    const hScale = this.inieHAxis(svg);
    //X的對映
    const xScale = this.xScale = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]);
    this.xScaleClamp = d3.scaleLinear().domain([0, this.tSecond]).range([0, this.chartWidth - midwidth]).clamp(true);
    //x軸
    this.xAxis = d3.axisBottom(xScale).ticks(10).tickSize(10).tickPadding(10).tickFormat((d) => '');
    //y軸
    let yAxis = d3.axisLeft(hScale).ticks(2).tickSize(5);
    this.yScale2 = d3.scaleLinear().domain([-this.zoomScale[this.zoomIndex], this.zoomScale[this.zoomIndex]]).range([this.chartHeight - this.chartheightGap * 2, 0]).clamp(true);
    let yAxis2 = d3.axisLeft(this.yScale2).ticks(3).tickSize(1);
    //_self.y2 = d3.scaleLinear().domain([-_self.zoomScale[_self.zoomIndex], _self.zoomScale[_self.zoomIndex]]).range([height - 50, 0]).clamp(true);
    //_self.yAxis2 = d3.axisLeft(_self.y2).ticks(3).tickSize(1);
    const colors = [this.gxColor, this.gyColor, this.gzColor];

    //路徑對映計算
    const lines = this.pathcMapCal(xScale, hScale, this.xScaleClamp);

    //畫 gxgraph
    const gxgraph = svg.append("g");
    gxgraph
      .style("opacity", `${this.focusMode == "na" ? "1" : "0"}`)
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 0})`)
      .on('click', this.graphClick())
      ;
    //畫偵測大小
    this.drawCDRect(gxgraph, "gx", midwidth);
    this.drawGValue(gxgraph, 'gx', hScale, yAxis, this.xAxis, lines);

    //畫 gygraph
    const gygraph = svg.append("g");
    gygraph
      .style("opacity", `${this.focusMode == "na" ? "1" : "0"}`)
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 1})`)
      .on('click', this.graphClick())
      ;
    //畫偵測大小
    this.drawCDRect(gygraph, "gy", midwidth);
    this.drawGValue(gygraph, 'gy', hScale, yAxis, this.xAxis, lines);

    // //畫 gzgraph
    const gzgraph = svg.append("g");
    gzgraph
      .style("opacity", `${this.focusMode == "na" ? "1" : "0"}`)
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 2})`)
      .on('click', this.graphClick())
      ;
    //畫偵測大小
    this.drawCDRect(gzgraph, "gz", midwidth);
    this.drawGValue(gzgraph, 'gz', hScale, yAxis, this.xAxis, lines);
    //畫 glarggraph
    //console.log(this.focusMode);
    const glargegraph = svg.append("g");
    glargegraph
      .style("opacity", `${this.focusMode == "na" ? "0" : "1"}`)
      .attr("id", "glarge")
      //.attr("transform", "translate(" + _self.margin.left + "," + (_self.margin.top) + ")")
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + hScale(0) + this.chartheightGap * 0})`)
      .on('click', this.graphClick())
      ;

    //畫放大的bar
    this.drawGLargeValue(glargegraph, xScale, yAxis2, lines);
    //畫sidebar
    this.drawSideBar(svg, this.xScaleClamp);
    //畫文字
    this.drawText(svg);
  }
  //#region  事件相關
  private graphClick(): (d, i) => void {
    return (d, i) => {
      //console.dir(this);
      //console.log("graphClick d3.event.target=" + d3.event.target);
      const htmlid = d3.event.target.id;
      //console.log("graphClick=" + d3.event.target.id);
      if (this.focusMode == "gx" || this.focusMode == "gy" || this.focusMode == "gz") {
        this.focusMode = "na";
      } else {
        switch (d3.event.target.id) {
          case "gx":
            this.focusMode = htmlid;
            break;
          case "gy":
            this.focusMode = htmlid;
            break;
          case "gz":
            this.focusMode = htmlid;
            break;
          default:
            this.focusMode = "na";
            break;
        }
      }
      //console.log("this.focusMode=" + this.focusMode);
      //選到svg標籤
      const svg = d3.select(this.svgRef.nativeElement);
      this.drawChart(svg);
    }
  }
  private wheelevent(): (d, i) => void {
    return (d, i) => {
      //console.dir(this);
      //console.log(d3.event.x);
      //console.log(this);
      if (d3.event.wheelDelta < 0) {
        this.zoomIndex++;
        if (this.zoomIndex > 5)
          this.zoomIndex = 5;
      }
      else {
        this.zoomIndex--;
        if (this.zoomIndex < 0)
          this.zoomIndex = 0;
      }
      //console.log(this.zoomIndex);
      this.yScale2 = this.yScale2 = d3.scaleLinear().domain([-this.zoomScale[this.zoomIndex], this.zoomScale[this.zoomIndex]]).range([this.chartHeight - this.chartheightGap * 2, 0]).clamp(true);
      this.yAxis2 = d3.axisLeft(this.yScale2).ticks(3).tickSize(1);

      //路徑對映計算
      const lines = this.pathcMapCal(this.xScale, this.yScale2, this.xScaleClamp);

      const svg = d3.select(this.svgRef.nativeElement);
      let glarge = svg.select("#glarge");
      // console.log(glarge);
      glarge.remove();
      glarge = svg.append("g");
      glarge
        .attr("id", "glarge")
        .style("opacity", `${this.focusMode == "na" ? "0" : "1"}`)
        .attr("stroke", "#FFF")
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.hScale(0) + this.chartheightGap * 0})`)
        .on('click', this.graphClick())
        ;
      //畫放大的bar
      this.drawGLargeValue(glarge, this.xScale, this.yAxis2, lines);
      // _self.svg.glarge.remove();
      // _self.svg.glarge = _self.svg.append("g")
      //     .style("opacity", 1)
      //     .attr("stroke", "#FFF")
      //     .attr("transform", "translate(" + (_self.margin.left + 3) + "," + (_self.margin.top) + ")")
      //     //.attr("transform", "translate(" + _self.margin.left + "," + (_self.margin.top) + ")")
      //     .call(drawGValue, "large");

    }
  }
  private startAndDragged(): (d, i) => void {
    return (d, i) => {
      //console.dir(this);
      //console.log(d3.event.x);
      //console.log(this.xScaleClamp.invert(d3.event.x));
      this.moveCircleLine(this.xScaleClamp.invert(d3.event.x));
    }
  }
  private svgClickEvent() {

    console.log(d3.event.target);
  }
  //#endregion
  //畫sidebar
  private drawSideBar(svg: any, xScaleClamp: any) {
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
        .on("start drag", this.startAndDragged())
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
  //畫文字
  private drawText(svg: any) {
    const gtext = svg.append("g");
    const gaxislabels = ["X", "Y", "Z"];
    const gtxtlabels = ["gxTxt", "gyTxt", "gzTxt"];
    const gtxtvalues = ["gxVal", "gyVal", "gzVal"];
    let left = this.margin.left;
    for (let i = 0; i < 3; i++) {

      const gitext = gtext.append("text")
        .attr("id", gtxtlabels[i])
        .attr("x", `${left}`)
        .attr("y", `${this.margin.top}`)
        .attr("dy", "0.71em")
        ;
      gitext.style("font-size", this.gFontSize)
        .text(gaxislabels[i])
        .attr("fill", this.colors[i]);

      const giVal = gtext.append("text")
        .attr("id", gtxtvalues[i])
        .attr("x", `${left + 10}`)
        .attr("y", `${this.margin.top}`)
        .attr("dy", "0.71em")
        ;
      giVal.style("font-size", this.gFontSize)
        .text("0.0000")
        .attr("fill", this.colors[i]);
      left += 60;
    }
  }
  private updateText(gxV, gyV, gzV) {
    let selectID = "";
    let gMap = [
      { "k": "#gxVal", "v": gxV / this.gsensorScale },
      { "k": "#gyVal", "v": gyV / this.gsensorScale },
      { "k": "#gzVal", "v": gzV / this.gsensorScale }
    ];
    gMap.forEach(item => {
      selectID = item.k;
      d3.select(selectID).text(item.v.toFixed(5));
    });
  }


  private moveCircleLine(h) {
    //console.log(h);
    const btncircle = d3.select('.handle');
    //console.log(btncircle);
    btncircle.attr("cx", this.xScale(h));
    const btnline = d3.select('.trackbar');
    //console.log(btnline);
    btnline.attr("x1", this.xScaleClamp(h)).attr("x2", this.xScaleClamp(h));
    this.currentSec = Math.floor(h);
    //console.log(this.currentSec);
    let d = this.dataset[this.currentSec];
    if (d != null) {
      //console.log(d);
      this.updateText(d.gx, d.gy, d.gz);
    }
    //
  }

  private drawGLargeValue(selection: any, xScale: any, yAxis2: any, lines: any) {
    let gline = null;
    let color = null;
    switch (this.focusMode) {
      case "gx":
        gline = lines[0];
        color = this.colors[0];
        break;
      case "gy":
        gline = lines[1];
        color = this.colors[1];
        break;
      case "gz":
        gline = lines[2];
        color = this.colors[2];
        break;
      default:
        gline = lines[0];
        color = this.colors[0];
        break;
    }
    gline = this.getLargeline(xScale, this.yScale2);
    //畫Y軸
    selection.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis2);
    selection.append("g")
      .attr("class", "axis axis--x")
      .attr("stroke-dasharray", "2,2")
      //.attr("transform", "translate(0," + _self.y2(0) + ")")
      .attr("transform", `translate(0,${this.yScale2(0)})`)
      .call(this.xAxis);

    selection.append("path")
      .datum(this.dataset)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('class', 'line')
      .attr('d', gline);

  }
  private getLargeline(xScale: any, yScale2: any) {
    let gline = null;
    switch (this.focusMode) {
      case "gx":
        gline = d3.line()
          .x((d: any) => xScale(d.date))
          .y((d: any) => yScale2(d.gx));
        break;
      case "gy":
        gline = d3.line()
          .x((d: any) => xScale(d.date))
          .y((d: any) => yScale2(d.gy));
        break;
      case "gz":
        gline = d3.line()
          .x((d: any) => xScale(d.date))
          .y((d: any) => yScale2(d.gz));
        break;

    }
    return gline;
  }
  private drawGValue(selection: any, gType: any, hScale: any, yAxis: any, xAxis: any, lines: any) {
    let gline = null;
    let color = null;
    switch (gType) {
      case "gx":
        gline = lines[0];
        color = this.colors[0];
        break;
      case "gy":
        gline = lines[1];
        color = this.colors[1];
        break;
      case "gz":
        gline = lines[2];
        color = this.colors[2];
        break;
    }
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

    //畫資料
    selection.append("path")
      .datum(this.dataset)
      .attr('id', `${gType}`)
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
  //畫偵測框框
  private drawCDRect(selection: any, htmlid: any, midwidth: any) {
    const detrect = selection.append("rect");
    detrect
      .attr('transform', `translate(0, 0)`)
      .attr("id", htmlid)
      .attr("width", `${this.chartWidth - midwidth}`)
      .attr("height", `${this.chartheightGap}`)
      //.attr('fill', "#333333")
      .attr('fill', "white")
      .attr('fill-opacity', "0");
    ;
  }
  //初始化svg
  private initSvg(svg: any, visiable = false) {
    //建立svg
    svg
      .attr('width', this.chartWidth)
      .attr('height', this.chartHeight)
      .attr('transform', `translate(0, 0)`)
      .on('wheel', this.wheelevent())
      //.on('click', this.svgClickEvent)
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
        this.drawChart(svg);
        this.loading = false;
      });
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
  private inieHAxis(svg: any) {
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
    //console.log(this.chartheightGap);
    //console.log(` this.chartWidth=${this.chartWidth},this.chartHeight=${this.chartHeight}`);
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
