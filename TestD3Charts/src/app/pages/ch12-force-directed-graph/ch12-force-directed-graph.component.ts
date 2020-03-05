import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
interface Node {
  id: string;
  group: number;
}
interface Link {
  source: string;
  target: string;
  value: number;
}
interface Graph {
  nodes: Node[];
  links: Link[];
}
@Component({
  selector: 'app-ch12-force-directed-graph',
  templateUrl: './ch12-force-directed-graph.component.html',
  styleUrls: ['./ch12-force-directed-graph.component.scss']
})
export class Ch12ForceDirectedGraphComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  constructor() { }

  ngOnInit() {
    this.drawChart()
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
    const marge = { top: 60, botton: 60, left: 60, right: 60 };
    //位置信息
    let center = {
      x: `${(width - marge.left - marge.right) / 2}`,
      y: `${(height - marge.top - marge.botton) / 2}`
    };
    const g = svg.append("g");
    g.attr("transform", `translate(${center.x},${center.y})`);
    //準備數據
    //--節點集
    let nodes = [
      {
        index: 0,
        name: "三峽"
      },
      {
        index: 1,
        name: "樹林"
      },
      {
        index: 2,
        name: "鶯歌"
      },
      {
        index: 3,
        name: "大溪"
      },
      {
        index: 4,
        name: "士城"
      },
      {
        index: 5,
        name: "八德"
      },
      {
        index: 6,
        name: "中和"
      },
    ];
    //--邊集
    let edges = [
      { source: 0, target: 1, relation: "距離", value: 2 },
      { source: 0, target: 2, relation: "距離", value: 2 },
      { source: 0, target: 3, relation: "距離", value: 2 },
      { source: 0, target: 4, relation: "距離", value: 2 },
      { source: 2, target: 5, relation: "距離", value: 2 },
      { source: 4, target: 6, relation: "距離", value: 2 },
    ];
    //設罝一個color的顏色比例尺，為了依現不同的顏色
    const colorScale = d3.scaleOrdinal<number, string>()
      .domain(d3.range(nodes.length))
      .range(d3.schemeCategory10);
    //新建一個力導向圖
    const forceSimulation = d3.forceSimulation()
      .force("link", d3.forceLink())
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter());
    //生成節點數據
    forceSimulation.nodes(nodes)
      .on("tick", ticked);
    //生成邊線數據
    forceSimulation.force("link",
      d3.forceLink(edges)
        .distance((d) => {
          return d.value * 80;//每一邊的長度
        }));
    //設置圖形的中心位置
    forceSimulation.force("center",
      d3.forceCenter(0, 0));
    //在控制台輸出
    console.log(nodes);
    console.log(edges);

    //有了節點和邊線，開始繪制
    //繪制邊線
    let links = g.append("g")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", (d, i) => {
        return colorScale(i);
      })
      .attr("stroke-width", 1);
    let linksText = g.append("g")
      .selectAll("text")
      .data(edges)
      .enter()
      .append("text")
      .text((d) => {
        return d.relation;
      });
    //繪制節點
    let gsnode = g.append("g")
      .attr('class', 'nodes')
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g");
    let circles = gsnode.append("circle")
      .attr("r", 20)
      .attr("fill", (d, i) => {
        return colorScale(i);
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    let lables = gsnode.append("text")
      .attr('x', 0)
      .attr('y', 0)
      .text((d) => {
        return d.name;
      });

    gsnode.append("title")
      .text(function (d) { return d.name; });
    function dragstarted(d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0.8).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    function dragended(d) {
      if (!d3.event.active) {
        forceSimulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }
    function ticked() {
      links
        .attr("x1", function (d: any) { return d.source.x; })
        .attr("y1", function (d: any) { return d.source.y; })
        .attr("x2", function (d: any) { return d.target.x; })
        .attr("y2", function (d: any) { return d.target.y; });

      linksText
        .attr("x", function (d: any) {
          return (d.source.x + d.target.x) / 2;
        })
        .attr("y", function (d: any) {
          return (d.source.y + d.target.y) / 2;
        });

      gsnode
        .attr("transform", function (d: any) { return "translate(" + d.x + "," + d.y + ")"; });
    }
  }
}
