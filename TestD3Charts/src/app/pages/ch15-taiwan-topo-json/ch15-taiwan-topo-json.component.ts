import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
declare let topojson: any;
@Component({
  selector: 'app-ch15-taiwan-topo-json',
  templateUrl: './ch15-taiwan-topo-json.component.html',
  styleUrls: ['./ch15-taiwan-topo-json.component.scss']
})
export class Ch15TaiwanTopoJsonComponent implements OnInit {
  @ViewChild('svg', { static: true }) svgRef: ElementRef<SVGElement>;
  density = {
    "臺北市": 9952.60,
    "嘉義市": 4512.66,
    "新竹市": 4151.27,
    "基隆市": 2809.27,
    "新北市": 1932.91,
    "桃園市": 1692.09,
    "臺中市": 1229.62,
    "彰化縣": 1201.65,
    "高雄市": 942.97,
    "臺南市": 860.02,
    "金門縣": 847.16,
    "澎湖縣": 802.83,
    "雲林縣": 545.57,
    "連江縣": 435.21,
    "新竹縣": 376.86,
    "苗栗縣": 311.49,
    "屏東縣": 305.03,
    "嘉義縣": 275.18,
    "宜蘭縣": 213.89,
    "南投縣": 125.10,
    "花蓮縣": 71.96,
    "臺東縣": 63.75
  };
  constructor() { }

  ngOnInit() {
    this.drawChart();
  }
  drawChart() {
    //svg 畫布大小
    const width = 860;
    const height = 600;
    //得到svg畫布
    const svg = d3.select(this.svgRef.nativeElement);
    //設定svg畫布大小
    svg.attr("width", width);
    svg.attr("height", height);
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    svg.attr("preserveAspectRatio", `xMidYMid`);

    // 設定投影中心點與縮放倍率
    let projection = d3
      .geoMercator()
      .center([121, 24]) //可選擇 long and lat starting position
      .scale(6000) //可選擇 starting zoom position
      //.rotate([10, 0])//可選擇 where world split occurs
      ;
    // 將投影資料轉換為路徑
    let pathRenderer = d3.geoPath().projection(projection);

    var tooltip = d3.select("div.tooltip");
    //console.log(tooltip);

    let url = "https://gist.githubusercontent.com/ttom921/67dc5cd1c73052d7d0a241e6a721810d/raw/498a2ca876065001c20e4ede4a4de95b1fe5e6ec/taiwanTopoJSON";
    d3.json(url).then((data) => {
      //console.log(data);
      let features = topojson.feature(data, data.objects["COUNTY_MOI_1081121"]).features;
      // 這裡要注意的是 topodata.objects["COUNTY_MOI_1081121"] 中的 "COUNTY_MOI_1081121" 為原本 shp 的檔名
      //console.log(features);
      //人口密度
      for (let idx = features.length - 1; idx >= 0; idx--) {
        features[idx].density = this.density[features[idx].properties.COUNTYNAME];
        //console.log(features[idx].density);
      }
      let colors = d3.scaleLinear().domain([0, 10000]).range(<any[]>["#090", "#f00"])
      const g = svg.append("g");
      g.selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", pathRenderer)
        .attr("fill", (d: any) => colors(d.density))
        .on("mouseover", function (d: any) {
          //console.log(d);
          let html = `
          <p>名稱:${d.properties.COUNTYNAME} </p>
          <p>入口:${d.density} </p>
          `;
          tooltip.style("hidden", false).html(html);
          // tooltip.transition()
          //   .duration(200)
          //   .style("opacity", .9);
          // //tooltip.html(d.properties.NAME)
          // tooltip.html("aaaaaaaaaa")
          //   .style("left", (d3.event.pageX) + "px")
          //   .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mousemove", function (d: any) {
          let html = `
          <p>名稱:${d.properties.COUNTYNAME} </p>
          <p>入口:${d.density} </p>
          `;
          tooltip.classed("hidden", false)
            .style("top", (d3.event.pageY) + "px")
            .style("left", (d3.event.pageX + 10) + "px")
            .html(html);
        })
        .on("mouseout", function () {
          // tooltip.transition()
          //   .duration(500)
          //   //.style("opacity", 0);
          //   .style("opacity", 1);
          tooltip.classed("hidden", true);
        })
        ;
    });
  }

}
