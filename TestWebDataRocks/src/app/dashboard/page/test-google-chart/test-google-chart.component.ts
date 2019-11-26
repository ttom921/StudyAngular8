import { Component, OnInit, ViewChild } from '@angular/core';
import { WebDataRocksPivot } from 'src/app/webdatarocks/webdatarocks.angular4';

@Component({
  selector: 'app-test-google-chart',
  templateUrl: './test-google-chart.component.html',
  styleUrls: ['./test-google-chart.component.scss']
})
export class TestGoogleChartComponent implements OnInit {
  @ViewChild("pivot1", { static: true }) child: WebDataRocksPivot;

  pivotTableReportComplete: boolean = false;
  googleChartsLoaded: boolean = false;

  public pivotReport = {
    dataSource: {
      filename: "https://cdn.webdatarocks.com/data/data.csv"
    },
    slice: {
      rows: [{ uniqueName: "Business Type" }],
      columns: [{ uniqueName: "Measures" }],
      measures: [{ uniqueName: "Price", aggregation: "sum" }]
    }
  };

  constructor() { }

  ngOnInit() {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => this.onGoogleChartsLoaded());
  }
  onGoogleChartsLoaded() {
    this.googleChartsLoaded = true;
    if (this.pivotTableReportComplete) {
      this.createGoogleChart();
    }
  }
  createGoogleChart() {
    if (this.googleChartsLoaded) {
      this.child.webDataRocks.googlecharts.getData(
        { type: "column" },
        data => this.drawChart(data),
        data => this.drawChart(data)
      );
    }
  }
  drawChart(_data: any) {
    var data = google.visualization.arrayToDataTable(_data.data);

    var options = {
      title: "Sales by Business Types",
      legend: { position: "top" },
      colors: ["#7570b3"],
      isStacked: true
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("googlechart-container")
    );
    chart.draw(data, <google.visualization.ColumnChartOptions>options);
  }
  onReportComplete(): void {
    this.child.webDataRocks.off("reportcomplete");
    this.pivotTableReportComplete = true;
    this.createGoogleChart();
  }
  onPivotReady(pivot: WebDataRocks.Pivot): void {
    console.log("[ready] WebDataRocksPivot", this.child);
  }
}
