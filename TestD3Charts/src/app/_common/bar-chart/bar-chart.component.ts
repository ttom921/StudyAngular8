import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges } from '@angular/core';
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

  constructor() {

  }

  ngOnInit() {

  }
  ngOnChanges() {

  }
  ngAfterViewInit(): void {
    const data = [];
    // const data = [
    //   this.generateData(20, 10),
    //   this.generateData(20, 10)
    // ];
    for (let i = 0; i < (8); i++) {
      data.push([
        { data: Math.floor(Math.random() * 80) },
        { data: Math.floor(Math.random() * 80) }
      ]);
    }
    // const { width } = this.chartContainer.nativeElement.getBoundingClientRect();
    // const height = width / (16 / 9);
    // const margin = Math.min(Math.max(width * 0.1, 20), 50);
    const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
    const margin = 20;
    const svg = d3.select(this.svgRef.nativeElement);
    let fmt = `w=${width},h=${height}`;
    console.log(fmt);
    svg
      .attr('viewBox', `0 0 ${width - margin * 2} ${height - margin * 2}`)
      .attr('preserveAspectRatio', 'xMinYMid');

    // this.calWidthHeightMargin();
    // //console.log(this.data);
    // this.drawChart(this.data);
  }
  private getMaxValue(series: { data: number }[][]): number {
    return series.reduce((serieMax, serie) => {
      return Math.max(serieMax, serie.reduce((max, value) => Math.max(max, value.data), -Infinity))
    }, -Infinity);
  }
  // calWidthHeightMargin() {
  //   const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
  //   this.width = width;
  //   this.height = height;
  //   this.margin.left = Math.min(Math.max(width * 0.1, 20), 50);
  //   this.margin.top = Math.min(Math.max(height * 0.1, 20), 50);
  //   //this.margin = 2;
  //   let fmt = `w=${this.width},h=${this.height},m.top=${this.margin.top},m.left=${this.margin.left}`;
  //   console.log(fmt);
  // }
}
