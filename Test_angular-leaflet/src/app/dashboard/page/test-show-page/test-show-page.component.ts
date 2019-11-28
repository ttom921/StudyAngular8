import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// declare variable
declare let L;

@Component({
  selector: 'app-test-show-page',
  templateUrl: './test-show-page.component.html',
  styleUrls: ['./test-show-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestShowPageComponent implements OnInit {

  map: L.Map;
  constructor() { }

  ngOnInit() {
    this.map = L.map('mapid', {
      center: [24.9345812, 121.2728323],
      zoom: 14
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
      maxZoom: 18,
    }).addTo(this.map);

    this.TestCircultootip();
  }
  TestCircultootip() {


    var tp = L.tooltip({
      permanent: true,
      direction: 'center',
      className: 'text'
    }).setContent("50");

    let c = new L.CircleMarker([24.9345812, 121.2728323], {
      radius: 30,
      fillColor: "#ff7800",
      color: "#000",
      weight: 2,
      opacity: 0.3,
      fillOpacity: 0.5,
      //title: "test",
      //className: 'leaflet-tooltip'
      //className: 'mytext'
    })
      .bindTooltip(tp)
      .addTo(this.map);
    // var text = L.tooltip({
    //   permanent: true,
    //   direction: 'center',
    //   className: 'text'
    // }).setContent("20")
    //   .setLatLng(c.getLatLng());
    // text.addTo(this.map);


  }

}
