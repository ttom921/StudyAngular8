import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, HostBinding, AfterViewInit } from '@angular/core';
import { Layer, tileLayer, latLng, LatLngExpression } from 'leaflet';
import * as L from 'leaflet';
import { MapTestUtil } from 'src/app/_utility/map/map-test-util';
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
  //controllayers:L.Control.Layers;
  //公用的顯示layer
  layers: Layer[] = [];
  options = {};
  layersControl: {};
  //基礎的layer
  LAYER_OSM: any;
  //#region Marker cluster stuff
  //markerClusterGroup: L.MarkerClusterGroup;
  markerClusterGroups: {
    name: string,
    group: L.MarkerClusterGroup,
  }[] = [];
  markerClusterData: L.Marker[] = [];
  //markerClusterOptions: L.MarkerClusterGroupOptions;
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
    console.log("initMapLayer----------------------");
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
    console.log("onMapReady----------------------");
    this.map = ev;
    //this.AddOverClusterLayer("hisharp", this.markerClusterGroups[0]);
    this.AddOverClusterLayer(this.markerClusterGroups[0].name, this.markerClusterGroups[0].group);
    this.AddOverClusterLayer(this.markerClusterGroups[1].name, this.markerClusterGroups[1].group);
  }
  // onLayersControlReady(ev) {

  //   console.log("onLayersControlReady----------------------");
  //   console.log(ev);
  //   this.controllayers=ev;

  // }
  private HasOverlay(name: string): boolean {
    let ret = true;
    let overlays = this.layersControl["overlays"];
    //console.log(overlays.hasOwnProperty(name));
    ret = overlays.hasOwnProperty(name);
    return ret;
  }
  AddOverClusterLayer(gpname: string, group: L.MarkerClusterGroup) {
    //檢查是否有重覆的overlay

    if (this.HasOverlay(gpname) == false) {

      let overlays = this.layersControl["overlays"];
      overlays[gpname] = group;
      //console.log(this.controllayers);
      //overlays.push({ [gpname]: group });

      // this.layersControl = {
      //   overlays: {
      //     [gpname]: group,
      //   }
      // };
    }
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
    console.log("markerClusterReady----------------------");
    //this.markerClusterGroup = group;

  }
  refreshData(): void {
    console.log("refreshData----------------------");
    this.refreshdata1();
    this.refreshdata2();
    return;
    //this.markerClusterData = this.generateData(1000);
    // this.markerClusterData = this.generateDatabyCenter(this.center, 50);

    // this.markerClusterOptions = {
    //   singleMarkerMode: true,
    //   iconCreateFunction: function (cluster) {
    //     //console.log(cluster);
    //     var childCount = cluster.getChildCount();
    //     let icon;
    //     if (childCount == 1) {
    //       icon = L.divIcon({
    //         iconSize: [10, 10],
    //         iconAnchor: [5, 5],
    //         //popupAnchor: [10, 0],
    //         // shadowSize: [0, 0],
    //         html: '<div>' + childCount + '</div>'
    //       });
    //     } else {
    //       icon = L.divIcon({
    //         iconSize: [40, 40],
    //         className: 'hisharpcluster',
    //         html: '<span>' + childCount + '<span>'
    //       });
    //     }

    //     //return L.divIcon({ html: n, className: 'mycluster', iconSize: L.point(40, 40) });
    //     //var icon
    //     // var icon = L.divIcon({
    //     //   iconSize: [35, 35],
    //     //   iconAnchor: [10, 10],
    //     //   popupAnchor: [10, 0],
    //     //   shadowSize: [0, 0],
    //     //   html: '<div>' + cluster.getChildCount() + '</div>'
    //     // });
    //     return icon;
    //   }

    // };


    // this.markerClusterGroups.push({
    //   name: "hishapr",
    //   group: L.markerClusterGroup(this.markerClusterOptions),
    // });
    // // var markersList = [];

    // this.markerClusterData.forEach(element => {
    //   this.markerClusterGroups[0].group.addLayer(element);
    // });


    // this.markerClusterOptions = new L.MarkerClusterGroupOptions({

    // });
  }
  refreshdata1() {
    let markerClusterData = this.generateDatabyCenter(this.center, 50);

    let markerClusterOptions = {
      singleMarkerMode: true,
      iconCreateFunction: function (cluster) {
        //console.log(cluster);
        var childCount = cluster.getChildCount();
        // { html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) })

        var html = `<div class="hisharpcluster">
        <span>${childCount}</span>
        <div>`;
        let icon;
        if (childCount == 1) {
          icon = L.divIcon({
            iconSize: [10, 10],
            iconAnchor: [5, 5],
            //popupAnchor: [10, 0],
            // shadowSize: [0, 0],
            html: '<div>' + childCount + '</div>'
          });
        } else {
          icon = L.divIcon({
            iconSize: [40, 40],
            className: 'marker-cluster',
            html: html
          });
        }
        return icon;
      }
    };

    this.markerClusterGroups.push({
      name: "hisharp",
      group: L.markerClusterGroup(markerClusterOptions),
    });
    markerClusterData.forEach(element => {
      this.markerClusterGroups[0].group.addLayer(element);
    });
  }
  refreshdata2() {

    let center = { lat: 23.098943, lng: 120.217322 };
    let markerClusterData = this.generateDatabyCenter(center, 50);

    let markerClusterOptions = {
      singleMarkerMode: true,
      iconCreateFunction: function (cluster) {
        //console.log(cluster);
        var childCount = cluster.getChildCount();
        var html = `<div class="asacluster">
        <span>${childCount}</span>
        <div>`;
        let icon;
        if (childCount == 1) {
          icon = L.divIcon({
            iconSize: [10, 10],
            iconAnchor: [5, 5],
            //popupAnchor: [10, 0],
            // shadowSize: [0, 0],
            html: '<div>' + childCount + '</div>'
          });
        } else {
          icon = L.divIcon({
            iconSize: [40, 40],
            className: 'marker-cluster',
            html: html
          });
        }
        return icon;
      }
    };

    this.markerClusterGroups.push({
      name: "asa",
      group: L.markerClusterGroup(markerClusterOptions),
    });
    markerClusterData.forEach(element => {
      this.markerClusterGroups[1].group.addLayer(element);
    });
  }
  //var markers = this.markerClusterGroup.getAllChildMarkers();


  // var markers = L.markerClusterGroup({
  //   maxClusterRadius: 120,
  //   iconCreateFunction: function (cluster) {
  //     var markers = cluster.getAllChildMarkers();
  //     var n = 0;
  //     for (var i = 0; i < markers.length; i++) {
  //       n += markers[i].number;
  //     }
  //     return L.divIcon({ html: n, className: 'mycluster', iconSize: L.point(40, 40) });
  //   },
  //   //Disable all of the defaults:
  //   //spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false
  // });
  // this.markerClusterOptions = {
  //   maxClusterRadius: 80,
  // };
  //}
  generateDatabyCenter(centerLatLng: LatLngExpression, count: number): L.Marker[] {
    const data: L.Marker[] = [];
    for (let i = 0; i < count; i++) {
      const icon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      });
      let latlng = MapTestUtil.getInstance().getCenterRandom(centerLatLng);

      let markdata = L.marker(latlng, { icon });
      data.push(markdata);
    }
    return data;
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
