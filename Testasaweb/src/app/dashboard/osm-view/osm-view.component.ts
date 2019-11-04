import { Component, OnInit } from '@angular/core';
import { tileLayer, Layer, latLng, marker, icon, Point, circle, polygon, Marker, Popup } from 'leaflet';
import * as L from "leaflet";

interface MarkerMetaData {
  name: String;
  markerInstance: Marker;
  popupInstance: Popup
}

@Component({
  selector: 'osm-view',
  templateUrl: './osm-view.component.html',
  styleUrls: ['./osm-view.component.scss']
})
export class OsmViewComponent implements OnInit {
  map;
  streetMapsLayer;
  markerslayer: Layer[] = [];
  centermarkdata: MarkerMetaData;
  options = {};
  layersControl = {};
  infozoom = {};
  constructor() {

    //定義baseLayers
    this.streetMapsLayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });

    // this.centermark = marker([24.9345812, 121.2728323], {
    //   draggable: true,
    //   icon: icon({
    //     iconSize: [25, 41],
    //     iconAnchor: [13, 41],
    //     iconUrl: 'leaflet/marker-icon.png',
    //     shadowUrl: 'leaflet/marker-shadow.png'
    //   }),

    // });
    // // Layers control object with our on base layers and the one overlay layers
    // this.layersControl = {
    //   baseLayers: {
    //     'Street Maps': this.streetMapsLayer,
    //   },
    //   overlays: {
    //     'Marks layer': this.markerslayer,
    //   }
    // }
    //
    this.options = {
      layers: [this.streetMapsLayer],
      zoom: 16,
      zoomControl: true,//移除預設的
      center: latLng(24.9345812, 121.2728323)
    }

  }

  ngOnInit() {

    // //定欺基本

    // this.options = {
    //   layers: [
    //     tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    //   ],
    //   zoom: 15,
    //   zoomControl: false,//移除預設的
    //   center: latLng(24.9345812, 121.2728323)
    // };
    // this.layersControl = {
    //   baseLayers: {
    //     'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    //     'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    //   },
    //   overlays: {
    //     'Big Circle': circle([46.95, -122], { radius: 5000 }),
    //     'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    //   }
    // }
  }
  onMapReady(map) {
    // get a local reference to the map as we need it later
    this.map = map;
    console.log(this.map);

    this.PrintDebugInfo();
    //
    //let info = L.control().zoom("pos");
    //map.addControl(L.control.zoom({ position: 'bottomright' }));
    //map.addControl(L.control.zoom({ position: 'topright' }));
    this.AddCentermark();

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
  AddZoom() {
    this.infozoom = L.control.zoom({ position: 'bottomright' });
    this.map.addControl(this.infozoom);

    //lat += 0.0000001;
  }
  RemoveZoom() {

    this.map.removeControl(this.infozoom);
  }
  AddCentermark() {
    //目前中心點的mark
    let m = marker([24.9345812, 121.2728323], {
      draggable: true,
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      }),
    });
    // m.on('dragend', this.dragend);
    m.on('dragend', function (event) {
      var mapmarker = event.target
      var position = mapmarker.getLatLng();
      let popupelm = mapmarker.getPopup();
      //更新圖標的座標
      const popupContent = `<h3>lat:${position.lat} lng:${position.lng} </h3>`
      popupelm.setContent(popupContent);
    });
    //popup
    var position = m.getLatLng();
    // add popup functionality
    const popupContent = `<h3>lat:${position.lat} lng:${position.lng} </h3>`
    var popup = L.popup({
      autoPanPadding: [100, 100],//移動
      //offset: [-5, -10],
    })
      .setLatLng(position)
      .setContent(popupContent)
      ;
    m.bindPopup(popup).openPopup();

    this.centermarkdata = {
      name: "center marker",
      markerInstance: m,
      popupInstance: popup
    };
    this.markerslayer.push(m);

    // {
    //   name: entry.name,
    //   markerInstance: m,
    //   componentInstance: component
    // }
    // let latlng = this.centermarkdata.markerpro.getLatLng();
    // this.centermarkdata.markerpro.on('dragend', function (event) {
    //   var mapmarker = event.target
    //   // //console.log("marker->" + JSON.stringify(event));


    //   var position = mapmarker.getLatLng();
    //   let element = this.centermark.popuppro.getContent();
    //   // marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });
    //   //this.map.panTo(new L.LatLng(position.lat, position.lng))
    //   //let element = marker.getContent();
    //   //console.log("eln->" + element);
    //   //const popupContent = `<h3>lat:${position.lat} lng:${position.lng} </h3>`;
    //   //marker.setContent(popupContent);
    // })

    // console.log(latlng);
    // let lat = latlng.lat;
    // let lng = latlng.lng;
    // console.log("lng->" + lng);
    // console.log("lat->" + lat);
    // const newMarker = this.centermarkdata.markerpro;

    //this.markerslayer.push(newMarker);
  }
  // caption could be: '<i class="fa fa-eye" />',
  makeMarkerIcon(color, caption) {
    let myCustomColour = color + 'd0';

    let size = 10,    // size of the marker
      border = 2;   // border thickness

    let markerHtmlStyles = `
		background-color: ${myCustomColour};
		width: ${size * 3}px;
		height: ${size * 3}px;
		display: block;
		left: ${size * -1.5}px;
		top: ${size * -1.5}px;
		position: relative;
		border-radius: ${size * 3}px ${size * 3}px 0;
		transform: rotate(45deg);
		border: ${border}px solid #FFFFFF;
		`;

    let captionStyles = `
		transform: rotate(-45deg);
		display:block;
		width: ${size * 3}px;
		text-align: center;
		line-height: ${size * 3}px;
		`;

    let icon = L.divIcon({
      className: 'color-pin-' + myCustomColour.replace('#', ''),
      iconAnchor: [border, size * 2 + border * 2],
      //labelAnchor: [-(size / 2), 0],
      popupAnchor: [0, -(size * 3 + border)],

      html: `<span style="${markerHtmlStyles}"><span style="${captionStyles}">${caption || ''}</span></span>`
    });

    return icon;
  }
  AddMark() {
    let center = this.map.getCenter();
    let lat = center.lat + 0.01 * (Math.random() - 0.5);
    let lng = center.lng + 0.01 * (Math.random() - 0.5);

    console.log("lng->" + lng);
    console.log("lat->" + lat);
    let myicon = icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
    });

    const myCustomColour = '#583470'

    const markerHtmlStyles = `
      background-color: ${myCustomColour};
      width: 3rem;
      height: 3rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`

    const htmlicon = L.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      //labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`
    })
    const texticon = this.makeMarkerIcon('#583488', '012345678')
    const falicon = this.makeMarkerIcon('#583470', '<i class="fa fa-eye" />');
    const maticon = this.makeMarkerIcon('#583470', '<i class="material-icons">card_travel</i>');

    const newMarker = marker(
      [lat, lng],

      {
        icon: texticon,

      }
    );
    //newMarker.valueOf()._icon.style.backgroundColor = 'green';
    //popup
    // add popup functionality
    const popupContent = `<h3>lat:${lat} lng:${lng} </h3>`
    var popup = L.popup({
      autoPanPadding: [100, 100],//移動
      //offset: [-5, -10],
    })
      .setLatLng({ lat, lng })
      .setContent(popupContent)
      ;
    newMarker.bindPopup(popup).openPopup();
    this.markerslayer.push(newMarker);
  }
  RemoveMark() {
    this.markerslayer.pop();
  }
}
