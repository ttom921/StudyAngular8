import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch04-elmsid',
  templateUrl: './ch04-elmsid.component.html',
  styleUrls: ['./ch04-elmsid.component.scss'],
})
export class Ch04ElmsidComponent implements OnInit {


  @ViewChild('d3body', { static: true }) private d3body: ElementRef;
  @ViewChild('d3body1', { static: true }) private d3body1: ElementRef;
  @ViewChild('d3body2', { static: true }) private d3body2: ElementRef;
  @ViewChild('d3body3', { static: true }) private d3body3: ElementRef;
  @ViewChild('d3body4', { static: true }) private d3body4: ElementRef;
  @ViewChild('d3body5', { static: true }) private d3body5: ElementRef;
  @ViewChild('d3body6', { static: true }) private d3body6: ElementRef;
  constructor() { }

  ngOnInit() {
    this.selectone();
    this.selectall();
    this.selectbyId();
    this.selectbyIndex();
    this.useAppend();
    this.userInsert();
    this.userRemove();

  }
  private selectone() {
    var p = d3.select(this.d3body.nativeElement)
      .select("p");
    p.style("color", "red");
  }
  private selectall() {
    let p = d3.select(this.d3body1.nativeElement)
      .selectAll("p");
    p.style("color", "red");
  }
  private selectbyId() {
    let body = d3.select(this.d3body2.nativeElement);
    let p2 = body.select(".myp2");
    p2.style("color", "red");
    let p3 = body.select("#myp3");
    p3.style("color", "green");
  }
  private selectbyIndex() {
    let dtatset = [3, 6, 9, 12];
    let body = d3.select(this.d3body3.nativeElement);
    let p = body.selectAll("p")
      .data(dtatset)
      .text((d, i, n) => {
        //console.log(n);
        if (i == 3) {
          let elm = n[i];
          //console.log(elm);
          d3.select(elm).style("color", "red")
        }
        return d;
      });
  }
  private useAppend() {
    let body = d3.select(this.d3body4.nativeElement);
    body.append("p")
      .text("another animal")
      .style("color", "red");
  }
  private userInsert() {
    let body = d3.select(this.d3body5.nativeElement);
    let p3 = body.insert("p", "#myp3")
      .text("insert an animal")
      .style("color", "red");
  }
  private userRemove() {
    let body = d3.select(this.d3body6.nativeElement);
    body.select("#myp3")
      .remove();
  }
}
