import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import * as d3 from 'd3';

@Component({
  selector: 'app-ch01-hello-world',
  templateUrl: './ch01-hello-world.component.html',
  styleUrls: ['./ch01-hello-world.component.scss']
})
export class Ch01HelloWorldComponent implements OnInit {
  @ViewChild('d3body', { static: true }) private d3body: ElementRef;
  constructor() { }

  ngOnInit() {
    let ps = d3.select(this.d3body.nativeElement)
      .selectAll('p');
    ps.text('Hello World');
    let spans = d3.select(this.d3body.nativeElement)
      .selectAll("span");
    spans.text("http://d3js.org");
  }
}
