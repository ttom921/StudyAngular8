import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-test-d3',
  templateUrl: './test-d3.component.html',
  styleUrls: ['./test-d3.component.scss']
})
export class TestD3Component implements OnInit, AfterViewInit {
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('texschart', { static: true }) private testContainer: ElementRef;
  constructor() { }

  ngOnInit() {

  }
  testSample1() {
    var myData = [1, 2, 3, 4, 5];
    d3.select(this.chartContainer.nativeElement)
      .selectAll('div')
      .data(myData)
      .enter()
      .append('div')
      .text(function (d) { return d; });
  }
  testSample() {
    // var body = this.testContainer.nativeElement;
    // var root = d3.select(body);
    // //console.log(root);
    // var span = d3.select("body").select("h3").select("span");
    // console.log(span);
    // span.text("hello world").style("font-size", "24px");
    var body = this.testContainer.nativeElement;
    var div = d3.select(body).selectAll('div');
    console.log(div);
  }
  ngAfterViewInit(): void {
    var body = this.chartContainer.nativeElement;
    var death_rate = [['越南', 24.26], ['阿魯巴', 17.48], ['關島', 10.01], ['澳門', 5.84]];
    const div_data_bind = d3.select(body).selectAll('div').data(death_rate);
    let div_set = div_data_bind.enter().append('div');/* 為「沒有物件可配對的資料」建立標籤*/
    div_set.style("height", "20px");
    div_set.style("background", "red");
    div_set.style("margin", "4px");
    div_set.style("width", (d, i) => {
      return (d[1] * 10) + "px";
    });
    div_data_bind.exit().remove();/* 刪除「沒有資料可配對的物件」*/
    div_set.text((d, i) => {
      return i + " /" + d[0]
    });
  }

}
