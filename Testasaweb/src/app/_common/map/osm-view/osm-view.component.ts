import { Component, OnInit, ViewChild, ElementRef, HostBinding, Input, AfterViewInit, ViewEncapsulation, ComponentFactoryResolver, Injector } from '@angular/core';
import { Layer, tileLayer, latLng, Control } from 'leaflet';
import { OSMMarkerManager } from '../manager/osm-marker-manager';
import { MarkerData } from '../model/marker-meta-data.model';
import * as L from 'leaflet';
import * as _ from 'lodash';
import { ColorMetaData } from '../model/color-meta-data.model';



@Component({
  selector: 'osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class OsmViewComponent implements OnInit, AfterViewInit {


  @ViewChild('osmmap', { static: true }) osmap: ElementRef;
  /**
   * 設定寬
   * @memberof OsmViewComponent
   */
  @HostBinding('style.width') @Input() width = '300px';
  /**
   * 設定高
   * @memberof OsmViewComponent
   */
  @HostBinding('style.height') @Input() height = '300px';
  /**
   * 設定中心的經緯度
   * @memberof OsmViewComponent
   */
  @Input() center = { lat: 24.941422, lng: 121.311301 };

  @Input() zoom = 18;

  map: L.Map;// Values to bind to Leaflet Directive
  //公用的顯示layer
  layers: Layer[] = [];
  options = {};
  layersControl: {};
  //基礎的layer
  LAYER_OSM: any;
  //maker相關
  public osmMarkerManager: OSMMarkerManager;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.CreateLayer();
  }

  ngOnInit() {
    this.initMapLayer();
  }
  initMapLayer() {

    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.LAYER_OSM.layer,
      },
      overlays: {
        //[laymarkname]: markgrp.layerGroup,
        //[laypolylinename]: polylinegrp.layerGroup,
        //"aa": this.markers[0],
        //"bb": this.markers[3],
        //"aaa": polyline([[24.936724298146263, 121.26878929033411], [24.937035613886447, 121.28794670104982]]),
        //"PolyLine": this.LAYER_POLYLINE.layers,
        //"Markers": this.LAYER_MARKS.layers,// .layerGroup,//this.markgroupLayer
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
      zoomControl: true,//移除預設的
      center: latLng(this.center)//latLng(24.9345812, 121.2728323)
    }
  }
  ngAfterViewInit(): void {
    this.osmap.nativeElement.style.width = this.width;
    this.osmap.nativeElement.style.height = this.height;
    //console.log("height=" + this.height);
  }
  //#region 建立layer
  /**
   * 建立基本的layer
   * @memberof OsmViewComponent
   */
  CreateLayer() {
    console.log("CreateLayer----------------------");
    this.CreateBaseLayer();
    this.CreateMarkLayer();
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
  CreateMarkLayer() {
    console.log("CreateMarkLayer-------建立marklayer--------");
    this.osmMarkerManager = new OSMMarkerManager(this.layers, this.resolver, this.injector)

  }
  //#endregion 建立layer
  onMapReady(ev) {
    console.log("onMapReady----------------------");
    //設定Bound的大小
    let diffl = 0.00001
    let bound = [
      [this.center.lat + diffl, this.center.lng],
      [this.center.lat - diffl, this.center.lng],
      //
      [this.center.lat, this.center.lng + diffl],
      [this.center.lat, this.center.lng - diffl],

    ]
    // get a local reference to the map as we need it later
    this.map = ev.fitBounds(bound, {
      maxZoom: this.zoom,//目前Zoom
      animate: true
    });
    this.map = ev;
    //this.PrintDebugInfo();
  }
  private HasOverlay(name: string): boolean {
    let ret = true;
    let overlays = this.layersControl["overlays"];
    //console.log(overlays.hasOwnProperty(name));
    ret = overlays.hasOwnProperty(name);
    return ret;
  }
  AddOverLayer(gpname: string) {
    //檢查是否有重覆的overlay

    if (this.HasOverlay(gpname) == false) {
      let lgmetadata = this.osmMarkerManager.GetLayerByName(gpname);
      if (lgmetadata == null) return;
      let lgname = lgmetadata.name;
      this.layersControl = {
        overlays: {
          [lgname]: lgmetadata.layerGroup,
        }
      };
    }
  }
  AddMarkPosition(markdata: MarkerData, bgcolorMetaData: ColorMetaData, fgcolorMetaData: ColorMetaData) {

    let markmetadata = this.osmMarkerManager.AddMark(markdata.name, markdata.description, markdata.position, bgcolorMetaData, fgcolorMetaData);
    //console.log(markmetadata.position);
    this.osmMarkerManager.AddPopHtml(markmetadata);
    this.AddOverLayer("marks");
  }
  TestMarkFun(markdatas: MarkerData[]) {
    console.log("TestMarkFun 測試mark----------------------");
    let bkcolorMetaData = new ColorMetaData();
    bkcolorMetaData.SetDefaultBGcolor();
    let fontcolorMetaData = new ColorMetaData();
    fontcolorMetaData.SetDefatulFGColor();
    markdatas.forEach(makedata => {
      let markmetadata = this.osmMarkerManager.AddMark(makedata.name, makedata.description, makedata.position, bkcolorMetaData, fontcolorMetaData);
      //console.log(markmetadata.position);
      this.osmMarkerManager.AddPopHtml(markmetadata);
      this.AddOverLayer("marks");
    });

    // let makedata = markdatas[0];
    // let markmetadata = this.osmMarkerManager.AddMark(makedata.name, makedata.description, makedata.position);
    // this.osmMarkerManager.AddPopHtml(markmetadata);
    //
    //this.AddOverLayer("marks");
    // let lgmetadata = this.osmMarkerManager.GetLayerByName("marks");
    // if (lgmetadata == null) return;
    // let lgname = lgmetadata.name;


    // this.layersControl = {
    //   overlays: {
    //     [lgname]: lgmetadata.layerGroup,
    //   }
    // };


  }
  PrintDebugInfo() {
    console.log("mapdebuginfo--------------------");
    let center = this.map.getCenter();
    console.log("center->" + JSON.stringify(center));
    let curzoom = this.map.getZoom();
    console.log("zoom->" + curzoom);
    let locbounds = this.map.getBounds()
    console.log("Bounds->" + JSON.stringify(locbounds));
    let locminzoom = this.map.getMinZoom()
    console.log("minZoom->" + JSON.stringify(locminzoom));
    let locmaxzoom = this.map.getMaxZoom()
    console.log("maxZoom->" + JSON.stringify(locmaxzoom));
    //console.log("centermark->" + JSON.stringify(this.centermark));

    console.log("mapdebuginfo--------------------");
  }
}
