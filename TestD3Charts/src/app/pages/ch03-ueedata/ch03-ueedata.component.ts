import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch03-ueedata',
  templateUrl: './ch03-ueedata.component.html',
  styleUrls: ['./ch03-ueedata.component.scss']
})
export class Ch03UEEdataComponent implements OnInit {
  @ViewChild('d3body', { static: true }) private d3body: ElementRef;
  @ViewChild('d3body1', { static: true }) private d3body1: ElementRef;
  constructor() { }

  ngOnInit() {
    //Update與Enter的使用
    this.UpdateEnter();
    //Update與Exit的使用
    this.UpdateExit();

  }
  UpdateEnter() {
    let dataset = [3, 6, 9, 12, 15];
    let p = d3.select(this.d3body.nativeElement)
      .selectAll("p");
    let update = p.data(dataset);//綁定數據，并得到update部分
    let enter = update.enter();//得到enter部分
    //下面檢驗是否直的得到
    //關於update的處理
    update.text((d, i) => {
      return `update: ${d},index:${i}`
    });
    //關於enter的處理
    //注意，這里需要先添加足夠多的<p>，然後在添加文本
    let pEnter = enter.append("p")//添加足夠多的<p>
    pEnter.text((d, i) => {
      return `enter: ${d},index:${i}`
    });
  }
  UpdateExit() {
    let dataset = [3, 6];
    let p = d3.select(this.d3body1.nativeElement)
      .selectAll("p");
    let update = p.data(dataset);//綁定數據，并得到update部分
    let exit = update.exit();//得到exit部分
    //下面檢驗是否直的得到
    //關於update的處理
    update.text((d, i) => {
      return `update: ${d},index:${i}`;
    });
    //關於exit的處理通常是刪除，但在這里我并沒有這麼做
    exit.text((d, i) => {
      return `exit`;
    });
  }
}
