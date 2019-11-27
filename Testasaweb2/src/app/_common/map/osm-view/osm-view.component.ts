import { Component, OnInit, ViewChild, ElementRef, HostBinding, Input } from '@angular/core';
import { Layer, tileLayer } from 'leaflet';

@Component({
  selector: 'osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.scss']
})
export class OsmViewComponent implements OnInit {


  @ViewChild('osmmap', { static: true }) osmap: ElementRef;
  @HostBinding('style.width') @Input() width = '300px';
  @HostBinding('style.height') @Input() height = '300px';

  map;// Values to bind to Leaflet Directive
  //公用的顯示layer
  layers: Layer[] = [];
  options = {};
  layerControl = {};
  //基礎的layer
  LAYER_OSM

  constructor() {
    this.CreateLayer();
  }

  ngOnInit() {
  }
  //#region 建立layer
  /**
   * 建立基本的layer
   * @memberof OsmViewComponent
   */
  CreateLayer() {
    console.log("CreateLayer----------------------");
    this.CreateBaseLayer();
  }
  CreateBaseLayer() {
    console.log("CreateBaseLayer----------------------");
    //定義baseLayers
    this.LAYER_OSM = {
      id: 'openstreetmap',
      name: 'Open Street Map',
      enable: true,
      layer: tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Open Street Map'
      })
    }
  }
  //#endregion 建立layer

}
