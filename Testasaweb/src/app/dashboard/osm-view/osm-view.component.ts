import { Component, OnInit, ComponentFactoryResolver, Injector, ComponentRef, HostBinding, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { tileLayer, Layer, latLng, marker, Marker, icon, Point, circle, polygon, TileLayer, LayerGroup, polyline, } from 'leaflet';
import { OsmDataService, MarkerData } from './osm-data.service';
import { OSMMarkerManager } from './manager/osm-marker-manager';
import { OSMPolylineManager } from './manager/osm-polyline-manager';



@Component({
  selector: 'osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.scss']
})
export class OsmViewComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.osmmap.nativeElement.width = this.width;
    this.osmmap.nativeElement.height = this.height;
  }
  @HostBinding('style.width') @Input() width = '300px'
  @HostBinding('style.height') @Input() height = '300px'
  @ViewChild('osmmap', { static: false }) osmmap: ElementRef

  map;
  // Values to bind to Leaflet Directive
  //公用的顯示layer
  layers: Layer[] = [];
  options = {};
  layersControl = {};
  //基礎的layer
  LAYER_OSM

  //maker相關
  osmMarkerManager: OSMMarkerManager;
  //Polyline相關
  osmPolylineManager: OSMPolylineManager;
  //LAYER_POLYLINE: OSMPolylineOSMGroupLayer;





  infozoom = {};

  constructor(
    private dataService: OsmDataService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector) {



    this.CreateLayer();

  }

  ngOnInit() {

    this.initMapLayer();

  }
  CreateLayer() {
    //console.log("CreateLayer----------------------");
    this.CreateBaseLayer();
    this.CreateMarkerLayer();
    this.CreatePolylineLayer();

  }
  CreateBaseLayer() {
    //console.log("CreateBaseLayer----------------------");
    //定義baseLayers
    //this.streetMapsLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
    this.LAYER_OSM = {
      id: 'openstreetmap',
      name: 'Open Street Map',
      enabled: true,
      layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Open Street Map'
      })
    };
  }
  CreateMarkerLayer() {
    //console.log("CreateMarkerLayer----------------------");
    this.osmMarkerManager = new OSMMarkerManager(this.layers, this.resolver, this.injector);
    ////中心點
    let markmetadata = this.osmMarkerManager.AddMark("center_marker", "descr 1", [24.9345812, 121.2728323], true);
    this.osmMarkerManager.AddPopHtml(markmetadata);
    // //maker1
    markmetadata = this.osmMarkerManager.AddMark("marker1", "descr marker1", [24.936724298146263, 121.26878929033411]);
    this.osmMarkerManager.AddPopHtml(markmetadata);
    // //marker2
    markmetadata = this.osmMarkerManager.AddMark("marker2", "descr marker2", [24.937035613886447, 121.28794670104982]);
    this.osmMarkerManager.AddPopHtml(markmetadata);

    // //跳出視窗
    // // dynamically instantiate a HTMLMarkerComponent
    // const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);
    // // we need to pass in the dependency injector
    // const component = factory.create(this.injector);
    // // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
    // let data = {
    //   name: markmetadata.name,
    //   description: markmetadata.description,
    //   position: markmetadata.position
    // }
    // component.instance.data = data

    // // pass in the HTML from our dynamic component
    // const popupContent = component.location.nativeElement;
    // // we need to manually trigger change detection on our in-memory component
    // // s.t. its template syncs with the data we passed in
    // component.changeDetectorRef.detectChanges();
    // // add popup functionality
    // markmetadata.markerInstance.bindPopup(popupContent).openPopup();




  }
  CreatePolylineLayer() {
    //console.log("CreatePolylineLayer----------------------");
    this.osmPolylineManager = new OSMPolylineManager(this.layers);
    this.osmPolylineManager.AddPolyline([[24.936724298146263, 121.26878929033411], [24.937035613886447, 121.28794670104982]]);

    this.osmPolylineManager.AddPolyline([[24.9345812, 121.2728323], [24.940210990934627, 121.2754497549031]]);

  }
  initMapLayer() {
    let markgrp = this.osmMarkerManager.layergroupcollect[0];
    let laymarkname = markgrp.name;

    let polylinegrp = this.osmPolylineManager.layergroupcollect[0];
    let laypolylinename = polylinegrp.name;

    // var foo = "bar";
    // var ob = { [foo]: "something" };
    //console.log(ob);
    //在左上角才有地圖
    // Values to bind to Leaflet Directive
    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.LAYER_OSM.layer,
      },
      overlays: {
        [laymarkname]: markgrp.layerGroup,
        [laypolylinename]: polylinegrp.layerGroup,
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
      zoom: 14,
      zoomControl: true,//移除預設的
      center: latLng(24.9345812, 121.2728323)
    }
  }
  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
    //console.log(this.map);

    this.PrintDebugInfo();
    //
    //let info = L.control().zoom("pos");
    //map.addControl(L.control.zoom({ position: 'bottomright' }));
    //map.addControl(L.control.zoom({ position: 'topright' }));
    //this.AddCentermark();

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
  // RemoveMark() {

  //   //let markname = "marker2";
  //   //this.osmMarkerManager.RemoveMark(markname);
  // }
  // AddZoom() {
  //   this.infozoom = L.control.zoom({ position: 'bottomright' });
  //   this.map.addControl(this.infozoom);

  //   //lat += 0.0000001;
  // }
  // RemoveZoom() {

  //   this.map.removeControl(this.infozoom);
  // }
  // AddCentermark() {
  //   this.centermarkdata = {
  //     id: 999,
  //     name: 'center makr',
  //     description: 'descr 1',
  //     position: [24.9345812, 121.2728323]
  //   };
  //   // dynamically instantiate a HTMLMarkerComponent
  //   const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);
  //   // we need to pass in the dependency injector
  //   const component = factory.create(this.injector);

  //   // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
  //   component.instance.data = this.centermarkdata;
  //   let m = marker(
  //     this.centermarkdata.position, {
  //     draggable: true,
  //     icon: icon({
  //       iconSize: [25, 41],
  //       iconAnchor: [13, 41],
  //       iconUrl: 'leaflet/marker-icon.png',
  //       shadowUrl: 'leaflet/marker-shadow.png'
  //     }),
  //   });
  //   var objparent = this;
  //   m.on('dragend', function (event) {
  //     var mapmarker = event.target;
  //     //console.log(mapmarker);
  //     var position = mapmarker.getLatLng();
  //     let popupelm = mapmarker.getPopup();
  //     let fmt: string = `lat:${position.lat} lng:${position.lng}`;
  //     //console.log(fmt);
  //     // //更新圖標的座標
  //     //console.log(popupelm);
  //     // const popupContent = `<h3>lat:${position.lat} lng:${position.lng} </h3>`
  //     // popupelm.setContent(popupContent);
  //     let contentelm = popupelm.getContent();
  //     //contentelm.data.position = position;
  //     //console.log(contentelm);
  //     //(popupelm as HTMLMarkerComponent).data.position = position;
  //     //component.changeDetectorRef.detectChanges();

  //     objparent.markers.forEach(element => {
  //       if (element.markerInstance === mapmarker) {
  //         element.componentInstance.instance.data.position = position;
  //         //console.log("find " + element.componentInstance.instance.data);
  //         component.changeDetectorRef.detectChanges();
  //       }
  //     });
  //   });

  //   // pass in the HTML from our dynamic component
  //   const popupContent = component.location.nativeElement;
  //   // we need to manually trigger change detection on our in-memory component
  //   // s.t. its template syncs with the data we passed in
  //   component.changeDetectorRef.detectChanges();
  //   // add popup functionality
  //   m.bindPopup(popupContent).openPopup();
  //   // finally add the marker to the map s.t. it is visible
  //   this.markerslayer.push(m);
  //   // add a metadata object into a local array which helps us
  //   // keep track of the instantiated markers for removing/disposing them later
  //   this.markers.push({
  //     name: this.centermarkdata.name,
  //     markerInstance: m,
  //     componentInstance: component
  //   });

  //   // //目前中心點的mark
  //   // let m = marker([24.9345812, 121.2728323], {
  //   //   draggable: true,
  //   //   icon: icon({
  //   //     iconSize: [25, 41],
  //   //     iconAnchor: [13, 41],
  //   //     iconUrl: 'leaflet/marker-icon.png',
  //   //     shadowUrl: 'leaflet/marker-shadow.png'
  //   //   }),
  //   // });
  //   // // m.on('dragend', this.dragend);
  //   // m.on('dragend', function (event) {
  //   //   var mapmarker = event.target
  //   //   var position = mapmarker.getLatLng();
  //   //   let popupelm = mapmarker.getPopup();
  //   //   //更新圖標的座標
  //   //   const popupContent = `<h3>lat:${position.lat} lng:${position.lng} </h3>`
  //   //   popupelm.setContent(popupContent);
  //   // });
  //   // //popup
  //   // var position = m.getLatLng();
  //   // // add popup functionality
  //   // const popupContent = `<h3>lat:${position.lat} lng:${position.lng} </h3>`
  //   // var popup = L.popup({
  //   //   autoPanPadding: [100, 100],//移動
  //   //   //offset: [-5, -10],
  //   // })
  //   //   .setLatLng(position)
  //   //   .setContent(popupContent)
  //   //   ;
  //   // m.bindPopup(popup).openPopup();

  //   // this.centermarkdata = {
  //   //   name: "center marker",
  //   //   markerInstance: m,
  //   //   popupInstance: popup
  //   // };
  //   // this.markerslayer.push(m);

  //   // {
  //   //   name: entry.name,
  //   //   markerInstance: m,
  //   //   componentInstance: component
  //   // }
  //   // let latlng = this.centermarkdata.markerpro.getLatLng();
  //   // this.centermarkdata.markerpro.on('dragend', function (event) {
  //   //   var mapmarker = event.target
  //   //   // //console.log("marker->" + JSON.stringify(event));


  //   //   var position = mapmarker.getLatLng();
  //   //   let element = this.centermark.popuppro.getContent();
  //   //   // marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });
  //   //   //this.map.panTo(new L.LatLng(position.lat, position.lng))
  //   //   //let element = marker.getContent();
  //   //   //console.log("eln->" + element);
  //   //   //const popupContent = `<h3>lat:${position.lat} lng:${position.lng} </h3>`;
  //   //   //marker.setContent(popupContent);
  //   // })

  //   // console.log(latlng);
  //   // let lat = latlng.lat;
  //   // let lng = latlng.lng;
  //   // console.log("lng->" + lng);
  //   // console.log("lat->" + lat);
  //   // const newMarker = this.centermarkdata.markerpro;

  //   //this.markerslayer.push(newMarker);
  // }
  // // caption could be: '<i class="fa fa-eye" />',
  // makeMarkerIcon(color, caption, isFa = false) {
  //   let myCustomColour = color + 'd0';

  //   let size = 10,    // size of the marker
  //     border = 2;   // border thickness

  //   let markerHtmlStyles = `
  // 	background-color: ${myCustomColour};
  // 	width: ${size * 3}px;
  // 	height: ${size * 3}px;
  // 	display: block;
  // 	left: ${size * -1.5}px;
  // 	top: ${size * -1.5}px;
  // 	position: relative;
  // 	border-radius: ${size * 3}px ${size * 3}px 0;
  // 	transform: rotate(45deg);
  // 	border: ${border}px solid #FFFFFF;
  // 	`;
  //   let captionStyles;
  //   let colorText = "red";
  //   if (isFa == true) {
  //     captionStyles = `
  //     transform: rotate(-45deg);
  //     display:block;
  //     width: ${size * 3}px;
  //     text-align: center;
  //     line-height: ${size * 3}px;
  //     `;
  //   } else {
  //     captionStyles = `
  //     transform: rotate(-45deg);
  //     display:block;
  //     width: ${size * 3}px;
  //     text-align: center;
  //     line-height: ${size * 3}px;
  //     color:${colorText};
  //     `;
  //   }


  //   let icon = L.divIcon({
  //     className: 'color-pin-' + myCustomColour.replace('#', ''),
  //     iconAnchor: [border, size * 2 + border * 2],
  //     popupAnchor: [0, -(size * 3 + border)],

  //     html: `<span style="${markerHtmlStyles}"><span style="${captionStyles}">${caption || ''}</span></span>`
  //   });

  //   return icon;
  // }
  // addMarker() {
  //   // simply iterate over the array of markers from our data service
  //   // and add them to the map
  //   for (const entry of this.dataService.getMarkers()) {
  //     // dynamically instantiate a HTMLMarkerComponent
  //     const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);
  //     // we need to pass in the dependency injector
  //     const component = factory.create(this.injector);

  //     // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
  //     component.instance.data = entry;

  //     const maticon = this.makeMarkerIcon('#583470', '<i class="material-icons">card_travel</i>');
  //     // create a new Leaflet marker at the given position
  //     let m = marker(
  //       entry.position,
  //       {
  //         //icon: texticon,//文字的icon
  //         //icon: falicon,//fontawone的icon
  //         icon: maticon,//angular material的
  //       }
  //     );


  //     // pass in the HTML from our dynamic component
  //     const popupContent = component.location.nativeElement;
  //     // we need to manually trigger change detection on our in-memory component
  //     // s.t. its template syncs with the data we passed in
  //     component.changeDetectorRef.detectChanges();
  //     // add popup functionality
  //     m.bindPopup(popupContent).openPopup();
  //     // finally add the marker to the map s.t. it is visible
  //     this.markerslayer.push(m);
  //     // add a metadata object into a local array which helps us
  //     // keep track of the instantiated markers for removing/disposing them later
  //     this.markers.push({
  //       name: entry.name,
  //       markerInstance: m,
  //       componentInstance: component
  //     });
  //   }
  // }
  // AddMark() {
  //   let center = this.map.getCenter();
  //   let lat = center.lat + 0.01 * (Math.random() - 0.5);
  //   let lng = center.lng + 0.01 * (Math.random() - 0.5);

  //   console.log("lng->" + lng);
  //   console.log("lat->" + lat);

  //   const texticon = this.makeMarkerIcon('#583488', '012345678')
  //   const falicon = this.makeMarkerIcon('#583470', '<i class="fa fa-eye" />', true);
  //   const maticon = this.makeMarkerIcon('#583470', '<i class="material-icons">card_travel</i>');

  //   const newMarker = marker(
  //     [lat, lng],

  //     {
  //       //icon: texticon,//文字的icon
  //       //icon: falicon,//fontawone的icon
  //       icon: maticon,//angular material的
  //     }
  //   );
  //   //popup
  //   // add popup functionality
  //   const popupContent = `<h3>lat:${lat} lng:${lng} </h3>`
  //   var popup = L.popup({
  //     autoPanPadding: [100, 100],//移動
  //   })
  //     .setLatLng({ lat, lng })
  //     .setContent(popupContent)
  //     ;
  //   newMarker.bindPopup(popup).openPopup();
  //   this.markerslayer.push(newMarker);
  // }
  // RemoveMark() {
  //   this.markerslayer.pop();
  // }
}
