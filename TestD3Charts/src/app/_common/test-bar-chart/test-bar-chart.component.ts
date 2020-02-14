import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-test-bar-chart',
  templateUrl: './test-bar-chart.component.html',
  styleUrls: ['./test-bar-chart.component.scss']
})
export class TestBarChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  loading = false;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    const { width, height } = this.chartContainer.nativeElement.getBoundingClientRect();
    const margin = 20;
    const svg = d3.select(this.svgRef.nativeElement);
    this.drawChart(svg, width, height, margin);
  }
  drawChart(svg: any, width: number, height: number, margin: number) {

    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    // Set of data
    var dataset = [5, 2, 9, 4, 5, 6, 7];
    // bar colors
    const colors = d3.scaleLinear().domain([0, dataset.length]).range(<any[]>['red', 'blue']);
    const n = dataset.length;
    const maxValue = d3.max(dataset);
    // Create our SVG container
    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin');

    //x方向的座標的設定
    var xScale = d3.scaleLinear()
      .domain([0, dataset.length])
      .range([0, chartWidth]);
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(${margin}, ${chartHeight + margin})`)
      .call(d3.axisBottom(xScale));
    //y方向的座標的設定
    var yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, chartHeight]);

    var yScale2 = d3.scaleLinear()
      .domain([0, maxValue])
      .range([chartHeight, 0]);

    svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin}, ${margin})`)
      .call(d3.axisLeft(yScale2).ticks(Math.min(Math.floor(chartHeight / 50), maxValue)));
    //建立bar
    var bars = svg.append('g')
      .attr('class', 'bars');

    // Bind data to chart, and create bars
    bars.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .style('fill', (d, i) => colors(i))
      .attr('x', (d, i) => xScale(i) + margin)
      .attr('y', (d) => chartHeight + margin - yScale(d))//使正常顯示
      .attr('width', 20)
      .attr('height', (d, i) => {
        return yScale(d);//放火顯示
      });

    // data.forEach((d, i) => {
    //   console.log(d);
    //   //console.log(xScale(i));
    //   //console.log(yScale(i));
    //   // svg
    //   //   .append('rect')
    //   //   .attr('transform', `translate(${margin + xScale(i) + xScale(1) / 2}, ${margin})`)
    //   //   .style('fill', colors[i % 2])
    //   //   .attr('width', barWidth)
    //   //   .attr('height', 0)
    //   //   .transition()
    //   //   .attr('height', d * 10);
    //   svg
    //     .append('rect')
    //     .attr('x', `${margin + xScale(i)}`)
    //     .attr('y', (d) => `${chartWidth}-d`)
    //     .attr('width', barWidth)
    //     .style('fill', colors[i % 2])
    //     .attr('height', d * 10);

    // });

    // //
    // update
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'bar')
    //   .attr('x', d => xScale(d))
    //   .attr('y', d => yScale(0))
    //   .attr('width', xScale)
    //   .attr('height', 0)
    //   .style('fill', (d, i) => colors[i])
    //   .transition()
    //   .delay((d, i) => i * 10)
    //   .attr('y', d => yScale(d[1]))
    //   .attr('height', d => 10);

  }
}
