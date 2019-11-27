import { Component, OnInit, ViewChild } from '@angular/core';
import { OsmViewComponent } from 'src/app/_common/map/osm-view/osm-view.component';
import { LayerGroup, marker, icon, CircleMarker, tooltip } from 'leaflet';

@Component({
  selector: 'app-test-open-street',
  templateUrl: './test-open-street.component.html',
  styleUrls: ['./test-open-street.component.scss']
})
export class TestOpenStreetComponent implements OnInit {

  @ViewChild('osmview', { static: true }) osmview: OsmViewComponent

  constructor() { }

  ngOnInit() {
  }
  OnClick() {
    let marklayerGroup = new LayerGroup();
    var TooltipClass = {
      'className': 'class-tooltip'
    }
    var tp = tooltip({
      permanent: true,
      direction: 'center',
      className: 'myCSSClass'
    }).setContent("50");
    let c = new CircleMarker([24.9345812, 121.2728323], {
      radius: 30,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
      //title: "test",
      //className: 'leaflet-tooltip'
      //className: 'mytext'
    }).bindTooltip(tp);

    // let mytoolitps = () => {
    //   let tpl = `<h1> tooltips <h1><p>test massage for tooltips</p>`;
    //   return tpl;
    // };
    let m = marker([24.9345812, 121.2728323], {
      draggable: true,
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      }),
    });



    marklayerGroup.addLayer(m);
    m.bindTooltip(tp);
    // // 为 tooltips 指定 class 类名
    // m.bindTooltip(mytoolitps, { className: "sample-tooltips" });

    let circlelayerGroup = new LayerGroup();
    circlelayerGroup.addLayer(c);
    this.osmview.layersControl = {
      overlays: {
        "mmmark": marklayerGroup,
        "ccmark": circlelayerGroup,
      }
    };
    //this.map.addLayer(this.layersControl.overlays[this.cafeLayerName]);
    this.osmview.map.addLayer(this.osmview.layersControl["overlays"]["mmmark"]);
    //this.osmview.map.addLayer(this.osmview.layersControl["overlays"]["ccmark"]);
    //this.osmview.map.invalidateSize();
  }
}
