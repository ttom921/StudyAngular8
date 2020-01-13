import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as _ from 'loadsh';

import 'leaflet.markercluster';
import { ColorMetaData } from '../model/color-meta-data.model';
import { DivIcon } from 'leaflet';
import { OSMColorManager } from '../manager/osm-color-manager';
import { MakerClusterGroupMetaData } from '../model/maker-cluster-group-meta-data';
import { MarkerMetaData } from '../model/marker-meta-data.model';
import { GPSStatus } from '../model/gpsstatus.enum';
declare var jQuery: any;
@Injectable({
  providedIn: 'root'
})
export class OSMMarkerClusterService {

  markerClusterGroups = {};
  constructor() {
  }
  //消除原來的資料
  ClearAllMarkerClusterGroup() {
    this.markerClusterGroups = {};
  }
  CreateMarkerClusterGroup(gpname: string) {
    let mkclgroup: L.MarkerClusterGroup;
    if (this.HasMarkerClusterGroup(gpname) == false) {
      //建立MarkerClusterGroup

      let bgcolor = OSMColorManager.getInstance().getColorByCompany(gpname);
      let markerClusterOptions = this.getMarkclusterOptions(bgcolor);
      mkclgroup = L.markerClusterGroup(markerClusterOptions);
      let markermetadatas: MarkerMetaData[] = [];
      let obj: MakerClusterGroupMetaData = {
        name: gpname,
        group: mkclgroup,
        markermetadatas: markermetadatas
      };
      this.markerClusterGroups[gpname] = obj;
    } else {
      mkclgroup = this.markerClusterGroups[gpname].group;
    }
  }
  GetMarkerClusterGroup(gpname: string): MakerClusterGroupMetaData {
    return this.markerClusterGroups[gpname];
  }
  private HasMarkerClusterGroup(name: string): boolean {
    let ret = true;
    //console.log(this.markerClusterGroups.hasOwnProperty(name));
    ret = this.markerClusterGroups.hasOwnProperty(name);
    return ret;
  }
  AddMarkMetaDataToGroup(gpname: string, markerMetaData: MarkerMetaData) {
    let mkclGroupMetaData: MakerClusterGroupMetaData = this.GetMarkerClusterGroup(gpname);
    let bgcolor = OSMColorManager.getInstance().getColorByCompany(gpname);
    let fgcolor = OSMColorManager.getInstance().getDefaultFGColor();
    let caption = `${markerMetaData.car_uid}`
    let myicon = this.makeMarkerIcon(bgcolor, fgcolor, caption, markerMetaData);
    let markdata = L.marker(markerMetaData.position, { icon: myicon });
    markerMetaData.markerInstance = markdata;
    mkclGroupMetaData.markermetadatas.push(markerMetaData);
    mkclGroupMetaData.group.addLayer(markdata);
  }
  getMarkclusterOptions(bgcolor: ColorMetaData): L.MarkerClusterGroupOptions {
    let bgColour = bgcolor.RGBAToHexA();
    let markerHtmlStyles = `
    background-color: ${bgColour};
    `;
    let markerClusterOptions = {
      singleMarkerMode: false,
      iconCreateFunction: function (cluster) {
        //console.log(cluster);
        let childCount = cluster.getChildCount();
        let html = `<div style="${markerHtmlStyles}">
        <span>${childCount}</span>
        <div>`;
        let icon = L.divIcon({
          iconSize: [40, 40],
          className: 'marker-cluster',
          html: html
        });
        return icon;

        //var markers = cluster.getAllChildMarkers();
        // { html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) })

        // var html = `<div style="${markerHtmlStyles}">
        // <span>${childCount}</span>
        // <div>`;
        // let icon;
        // if (childCount == 1) {
        //   //_.
        //   //剩下一個時的顯示
        //   let fgcolor = OSMColorManager.getInstance().getDefaultFGColor();
        //   let caption = `${childCount}`
        //   icon = OSMMarkerclusterManager.getInstance().makeMarkerIcon(bgcolor, fgcolor, caption);
        // } else {
        //   icon = L.divIcon({
        //     iconSize: [40, 40],
        //     className: 'marker-cluster',
        //     html: html
        //   });
        // }
        // return icon;
      }
    };
    return markerClusterOptions;
  }
  makeMarkerIcon(bgcolor: ColorMetaData, fgcolor: ColorMetaData, caption, markerMetaData: MarkerMetaData): DivIcon {
    return markerMetaData.GetdivIcon();
    // //建立GPS狀態
    // let hlgpson = "none";
    // let hlgpsoff = "none";
    // let hlgpsmove = "none";
    // //let gpsstate = "gpsoffline";
    // switch (markerMetaData.gpsstatus) {
    //   case GPSStatus.GPS_ONLine:
    //     hlgpson = "";
    //     break;
    //   case GPSStatus.GPS_OFFLine:
    //     hlgpsoff = "";
    //     break;

    //   case GPSStatus.GPS_MOVE:
    //     hlgpsmove = "";
    //     break;
    // }
    // let mybgColour = bgcolor.RGBAToHexA();

    // let size = 10,// size of the marker
    //   border = 2; // border thckness

    // //車牌顯示
    // let captionStyles;
    // let colorText = fgcolor.RGBAToHexA();
    // captionStyles = `
    //   background-color:#666363bd;
    //   color: #ffffff;
    //   display:block;
    //   width: ${size * 12}px;
    //   text-align: center;
    //   line-height: ${size * 2}px;
    //   margin-top: -${size * 9 / 2}px;
    //   margin-left: -${size * 9 / 2}px;
    //   font-size: 14px;
    //   `;
    // let icon = L.divIcon({
    //   className: 'color-pin-' + mybgColour.replace('#', ''),
    //   iconAnchor: [border, size * 2 + border * 2],
    //   popupAnchor: [0, -(size * 3 + border)],
    //   html:
    //     `<div id=${caption} >
    //       <div class="gpsonline" style="display:${hlgpson};" >
    //       </div>
    //       <div class="gpsoffline" style="display:${hlgpsoff};">
    //       </div>
    //       <div style="width:0;height:0;border-style: solid;border-width: 0 7px 28px 7px;border-color: transparent transparent #00ff26 transparent;
    //       transform: rotate(0deg);
    //       display:${hlgpsmove};">
    //       </div>
    //       <span style="${captionStyles}">${caption || ''}</span>
    //     </div>`
    // });

    // return icon;
  }
  //找到MarkMetadata
  private findmarkerMetaData(gpname: string, car_uid: string) {
    let markerMetaData: MarkerMetaData = null;
    let mkclGroupMetaData: MakerClusterGroupMetaData = this.GetMarkerClusterGroup(gpname);
    markerMetaData = _.find(mkclGroupMetaData.markermetadatas, { car_uid: car_uid });
    return markerMetaData;
  }
  // setGpsState(gpname: string, car_uid: string, gpsstate: GPSStatus = GPSStatus.GPS_OFFLine) {
  //   let markerMetaData = this.findmarkerMetaData(gpname, car_uid);
  //   markerMetaData.UpdateGPSStatus(gpsstate);
  //   // let el: HTMLElement = document.getElementById(car_uid);
  //   // if (!el) return;
  //   // //先全部hide
  //   // let elonline = jQuery(`#${car_uid}`).children().eq(0);
  //   // elonline.hide();
  //   // let eloffline = jQuery(`#${car_uid}`).children().eq(1);
  //   // eloffline.hide();
  //   // let elmove = jQuery(`#${car_uid}`).children().eq(2);
  //   // elmove.hide();
  //   // switch (gpsstate) {
  //   //   case GPSStatus.GPS_ONLine:
  //   //     elonline.show();
  //   //     break;
  //   //   case GPSStatus.GPS_OFFLine:
  //   //     eloffline.show();
  //   //     break;
  //   //   case GPSStatus.GPS_MOVE:
  //   //     elmove.show();
  //   //     break;
  //   // }
  //   // let eloffline = jQuery(`#${car_uid}`).children().eq(0);
  //   // eloffline.hide();
  //   // let elonline = jQuery(`#${car_uid}`).children().eq(1);
  //   // elonline.hide();
  //   // let elmove = jQuery(`#${car_uid}`).children().eq(2);
  //   // //lemove.css({ "border-width": "0 25px 100px 25px" });
  //   // var trans = elmove.css({ "transform": "rotate(40deg)" });
  //   // console.log(trans);


  // }
  // setCarHeading(gpname: string, car_uid: string, angle: number) {
  //   let markerMetaData = this.findmarkerMetaData(gpname, car_uid);
  //   markerMetaData.UpdateHeading(angle);
  //   // let el: HTMLElement = jQuery(car_uid)
  //   // if (!el) return;
  //   // //console.log(el);
  //   // let elmove = jQuery(`#${car_uid}`).children().eq(2);
  //   // elmove.css({ "transform": `rotate(${angle}deg)` });

  // }
}
