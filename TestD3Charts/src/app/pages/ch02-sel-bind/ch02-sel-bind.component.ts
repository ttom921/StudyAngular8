import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch02-sel-bind',
  templateUrl: './ch02-sel-bind.component.html',
  styleUrls: ['./ch02-sel-bind.component.scss']
})
export class Ch02SelBindComponent implements OnInit {
  @ViewChild('d3body', { static: true }) private d3body: ElementRef;
  @ViewChild('d3body1', { static: true }) private d3body1: ElementRef;
  constructor() { }

  ngOnInit() {
    //datum的使用
    let str = "is an animal";//新建一個字串
    let ps = d3.select(this.d3body.nativeElement)
      .selectAll("p");
    ps.datum(str)
      .text((d, i) => {
        return `第${i}個元素 ${d}`;
      });
    //data的使用
    let dataset = ["so cute", "cute", "fat"];
    let ps1 = d3.select(this.d3body1.nativeElement)
      .selectAll("p");
    ps1.data(dataset)
      .text((d, i) => {
        return `第${i}個動物+${d}`;
      });
  }
}
