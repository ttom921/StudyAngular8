import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
declare let topojson: any;
@Component({
  selector: 'app-ch14-topo-json',
  templateUrl: './ch14-topo-json.component.html',
  styleUrls: ['./ch14-topo-json.component.scss']
})
export class Ch14TopoJSONComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  @ViewChild('svg1', { static: true }) svgRef1: ElementRef<SVGElement>;
  constructor() { }

  ngOnInit() {
    this.drawChart();
    this.drawFlatChart();
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

    // 選擇顏色類型
    let colors = d3.scaleOrdinal(d3.schemeCategory10);
    // 設定投影中心點與縮放倍率
    let projection = d3
      .geoOrthographic()
      .scale(200)
      .translate([width / 2, height / 2])
      .clipAngle(90);
    // 將投影資料轉換為路徑
    let pathRenderer = d3.geoPath().projection(projection);
    //var url = "https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-50m.json";
    //var url = "https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json";
    let url = "https://gist.githubusercontent.com/ttom921/7c030c3ff7165f6d83478a82930c5957/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-110m.json";

    d3.json(url).then((data) => {
      //console.log(data);
      let countries = topojson.feature(data, data.objects.countries).features;
      d3.select("svg")
        .selectAll("path")
        .data(countries)
        .enter()
        .append("path")
        .attr("d", pathRenderer)
        .attr("fill", (d: any) => colors(d.id));

      //轉動
      d3.select("svg").call(//拖動事件在SVG元件上
        d3.drag()
          .subject(() => {
            let r = projection.rotate(); /* 目前轉動的角度 ... */
            //console.log(r);
            return { x: r[0], y: -r[1] };
          })
          .on("drag", function () {
            let r = projection.rotate();
            projection.rotate([d3.event.x, -d3.event.y, r[2]]);
            d3.select("svg").selectAll("path").attr("d", pathRenderer);
          })
      );
    });
  }
  drawFlatChart() {
    //svg 畫布大小
    const width = 860;
    const height = 500;
    //得到svg畫布
    const svg = d3.select(this.svgRef1.nativeElement);
    //設定svg畫布大小
    svg.attr("width", width);
    svg.attr("height", height);

    // 選擇顏色類型
    let colors = d3.scaleOrdinal(d3.schemeCategory10);


    //let url = "https://unpkg.com/world-atlas@1/world/110m.json";
    let url = "https://gist.githubusercontent.com/ttom921/7c030c3ff7165f6d83478a82930c5957/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-110m.json";
    d3.json(url).then((data) => {
      // 設定投影中心點與縮放倍率
      // let projection = d3
      //   .geoEquirectangular()
      //   .scale(153)
      //   .translate([width / 2, height / 2])
      //   .precision(.1);
      let projection = d3
        .geoMercator()
        .center([0, 0]) //可選擇 long and lat starting position
        .scale(100) //可選擇 starting zoom position
        .rotate([10, 0])//可選擇 where world split occurs
        ;

      // 將投影資料轉換為路徑
      let pathRenderer = d3.geoPath();
      pathRenderer.projection(projection);

      let countries = topojson.feature(data, data.objects.countries).features;
      //console.log(countries);
      const g = svg.append("g");
      g.selectAll("path")
        .data(countries)
        .enter()
        .append("path")
        .attr("d", pathRenderer)
        .attr("fill", (d: any) => colors(d.id))
        ;
    });
  }
}
