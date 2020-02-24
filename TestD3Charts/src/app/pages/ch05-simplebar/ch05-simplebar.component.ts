import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch05-simplebar',
  templateUrl: './ch05-simplebar.component.html',
  styleUrls: ['./ch05-simplebar.component.scss']
})
export class Ch05SimplebarComponent implements OnInit, AfterViewInit {

  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;

  //margin = { top: 60, bottom: 60, left: 60, right: 60 };//設置邊距
  dataset = [250, 210, 170, 130, 90];//數據（表示矩形的寬度）
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    const svg = d3.select(this.svgRef.nativeElement);//得到svg畫布
    const g = svg.append("g")//定義一個用裝個個圖表的一個分組，並設置他的位置
    const rectHeight = 30;//設置每一個矩形的高度
    g.selectAll("rect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("x", 20)//𦻑置左上角的x
      .attr("y", (d, i) => {//設定在上角的y
        return i * rectHeight;
      })
      .attr("width", (d) => {//設置寬
        return d;
      })
      .attr("height", rectHeight - 5)//設置長
      .attr("fill", "blue")//顏色填充
      ;

  }
}
