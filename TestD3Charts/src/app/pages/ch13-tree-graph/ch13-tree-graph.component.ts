import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ch13-tree-graph',
  templateUrl: './ch13-tree-graph.component.html',
  styleUrls: ['./ch13-tree-graph.component.scss']
})
export class Ch13TreeGraphComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  @ViewChild('svg1', { static: true }) svgRef1: ElementRef<SVGElement>;
  //準備數據
  //--以樹的形式存儲
  //建立個層級布局
  dataset = {
    name: "台灣",
    children: [
      {
        name: "台北市",
        children: [
          {
            name: "大安區"
          },
          {
            name: "大直區"
          }
        ]
      },
      {
        name: "新北市",
        children: [
          {
            name: "三峽區",
            children: [
              {
                name: "龍恩里"
              }
            ]
          }
        ]
      },
      {
        name: "桃園市",
      }
    ]
  };

  constructor() { }

  ngOnInit() {
    this.drawChart();
    this.drawVChart();
  }
  drawChart() {
    //svg 畫布大小
    const width = 860;
    const height = 500;
    //得到svg畫布
    const svg = d3.select(this.svgRef.nativeElement);
    //設定svg畫布大小
    svg.attr("width", width);
    svg.attr("height", height);
    const marge = { top: 60, bottom: 60, left: 60, right: 60 };
    //位置信息
    let center = {
      x: `${(width - marge.left - marge.right) / 2}`,
      y: `${(height - marge.top - marge.bottom) / 2}`
    };

    const hierarchyData = d3.hierarchy(this.dataset)
      .sum((d: any) => {
        return d.children;
      });
    //console.log(hierarchyData);
    //創建一個樹狀圖
    let treewidth = 600 - (marge.left + marge.right);
    let treeHeight = 380 - (marge.top + marge.bottom);
    console.log(`treewidth=${treewidth},treeHeight=${treeHeight}`);
    const tree = d3.tree()
      .size([treewidth, treeHeight])
      //.size([100, 100])
      .separation((a, b) => {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      })
    //初始化樹狀圖，也就是傳入數據並得到繪制樹基本數據
    const treeData = tree(hierarchyData);
    //得到邊和節點
    const nodes = treeData.descendants();
    const links = treeData.links();
    //輽出節點和邊
    console.log(nodes);
    console.log(links);
    const g = svg.append("g");
    g.attr("transform", `translate(${marge.left},${0})`);
    //繪制邊
    g.append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", d3.linkHorizontal<any, any>()
        .x(d => d.y)
        .y(d => d.x)
      )

      .attr("fill", "none")
      .attr("stroke", "yellow")
      .attr("stroke-width", 3);
    //繪制節點和文字
    //創建直以繪制每個節點和對應文字的分組<g>
    const gs = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d: any) => {
        let cx = d.x;
        let cy = d.y;
        return `translate(${cy},${cx})`;
      });
    //繪制節點
    gs.append("circle")
      .attr("r", 6)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 1);
    //文字
    gs.append("text")
      .attr("x", (d: any) => {
        return d.children ? -40 : 8;
      })
      .attr("y", -5)
      .attr("dy", 10)
      .text((d: any) => {
        return d.data.name;
      });
  }
  drawVChart() {
    //svg 畫布大小
    const width = 860;
    const height = 500;
    //得到svg畫布
    const svg = d3.select(this.svgRef1.nativeElement);
    //設定svg畫布大小
    svg.attr("width", width);
    svg.attr("height", height);
    const marge = { top: 60, bottom: 60, left: 60, right: 60 };
    //位置信息
    let center = {
      x: `${(width - marge.left - marge.right) / 2}`,
      y: `${(height - marge.top - marge.bottom) / 2}`
    };

    const hierarchyData = d3.hierarchy(this.dataset)
      .sum((d: any) => {
        return d.children;
      });
    //console.log(hierarchyData);
    //創建一個樹狀圖
    let treewidth = 600 - (marge.left + marge.right);
    let treeHeight = 380 - (marge.top + marge.bottom);
    console.log(`treewidth=${treewidth},treeHeight=${treeHeight}`);
    const tree = d3.tree()
      .size([treewidth, treeHeight])
      //.size([100, 100])
      .separation((a, b) => {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      })
    //初始化樹狀圖，也就是傳入數據並得到繪制樹基本數據
    const treeData = tree(hierarchyData);
    //得到邊和節點
    const nodes = treeData.descendants();
    const links = treeData.links();
    //輽出節點和邊
    //console.log(nodes);
    //console.log(links);
    const g = svg.append("g");
    g.attr("transform", `translate(${marge.left},${marge.bottom})`);
    //繪制邊
    g.append("g")
      .selectAll("path")
      .data(links)
      .enter()
      .append("path")
      .attr("d", d3.linkVertical<any, any>()
        .x(d => d.x)
        .y(d => d.y)
      )
      .attr("fill", "none")
      .attr("stroke", "yellow")
      .attr("stroke-width", 3);
    //繪制節點和文字
    //創建直以繪制每個節點和對應文字的分組<g>
    const gs = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d: any) => {
        let cx = d.x;
        let cy = d.y;
        return `translate(${cx},${cy})`;
      });
    //繪制節點
    gs.append("circle")
      .attr("r", 6)
      .attr("fill", "white")
      .attr("stroke", "blue")
      .attr("stroke-width", 1);
    //文字
    gs.append("text")
      .attr("x", (d: any) => {
        return d.children ? -40 : 8;
      })
      .attr("y", -5)
      .attr("dy", 10)
      .text((d: any) => {
        return d.data.name;
      });

  }
}
