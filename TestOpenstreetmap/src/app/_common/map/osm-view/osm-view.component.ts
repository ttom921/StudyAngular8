import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, HostBinding, AfterViewInit } from '@angular/core';
import { Layer, tileLayer, latLng } from 'leaflet';
import * as L from 'leaflet';
@Component({
  selector: 'osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OsmViewComponent implements OnInit, AfterViewInit {

  @ViewChild('osmmap', { static: true }) osmap: ElementRef;
  @HostBinding('style.width') @Input() width = '300px';
  @HostBinding('style.height') @Input() height = '300px';
  /**
    * 設定中心的經緯度
    * @memberof OsmViewComponent
    */
  @Input() center = { lat: 24.941422, lng: 121.311301 };

  /**
   * 目前的zoom的大小
   * @memberof OsmViewComponent
   */
  @Input() zoom = 14;

  map: L.Map;// Values to bind to Leaflet Directive
  //公用的顯示layer
  layers: Layer[] = [];
  options = {};
  layersControl: {};
  //基礎的layer
  LAYER_OSM: any;
  //#region Marker cluster stuff
  markerClusterGroup: L.MarkerClusterGroup;
  markerClusterData: L.Marker[] = [];
  markerClusterOptions: L.markerClusterOptions
  //#endregion Marker cluster stuff
  constructor() {
    this.CreateLayer();
  }

  ngOnInit() {
    this.initMapLayer();
    this.refreshData();
  }
  ngAfterViewInit(): void {
    this.osmap.nativeElement.style.width = this.width;
    this.osmap.nativeElement.style.height = this.height;
    let fmt = `width:${this.width} height:${this.height}`;
    console.log(fmt);
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
        maxZoom: 18,//設定最大的Zoom
        attribution: 'Open Street Map'
      })
    }
  }
  //#endregion 建立layer
  initMapLayer() {

    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.LAYER_OSM.layer,
      },
      overlays: {
        //Square: this.square.layer,
        //Polygon: this.polygon.layer,
        //Marker: this.marker.layer,
        //GeoJSON: this.geoJSON.layer
      }
    };
    this.options = {
      layers: [
        this.LAYER_OSM.layer,
        //markgrp.layerGroup,
        //polylinegrp.layerGroup,
      ],//有設定預設才會選到
      zoom: this.zoom,
      //zoomControl: true,//移除預設的
      center: latLng(this.center)//latLng(24.9345812, 121.2728323)
    }
  }
  onMapReady(ev) {
    this.map = ev;
  }
  //#region Marker cluster stuff
  // Generators for lat/lon values
  generateLat() {
    return Math.random() * 360 - 180;
  }
  generateLon() {
    return Math.random() * 180 - 90;
  }
  markerClusterReady(group: L.MarkerClusterGroup) {

    this.markerClusterGroup = group;

  }
  refreshData(): void {
    this.markerClusterData = this.generateData(1000);
  }
  generateData(count: number): L.Marker[] {

    const data: L.Marker[] = [];

    for (let i = 0; i < count; i++) {

      const icon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      });

      data.push(L.marker([this.generateLon(), this.generateLat()], { icon }));
    }

    return data;

  }
  //#endregion Marker cluster stuff


}
