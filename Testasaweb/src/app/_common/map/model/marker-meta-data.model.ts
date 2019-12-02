import { LatLngExpression, Marker, divIcon, marker } from 'leaflet';
import { HTMLMarkerComponent } from '../htmlmarker/htmlmarker.component';
import { ComponentRef } from '@angular/core';
import { ColorUtil } from 'src/app/_util/colorutil';
import { ColorMetaData } from './color-meta-data.model';

export interface MarkerData {
  id: String;
  name: String;
  description: String;
  position: LatLngExpression;
}
/**
 * Mark的中繼資料
 *
 * @export
 * @class MarkerMetaData
 */
export class MarkerMetaData implements MarkerData {
  id: string;
  name: String;
  description: String;
  position: LatLngExpression;
  isDraggable: boolean;
  markerInstance: Marker;
  componentInstance: ComponentRef<HTMLMarkerComponent>;
  constructor(name: String, description: String, otherLatLng: LatLngExpression) {
    this.name = name;
    this.description = description;
    this.position = otherLatLng;
    this.isDraggable = false;
  }
  public CreateMark(otherLatLng: LatLngExpression, bgcolorMetaData: ColorMetaData, fgcolorMetaData: ColorMetaData, isDraggable: boolean = false): Marker {
    this.isDraggable = isDraggable;

    //let bk = bgcolorMetaData.RGBAToHexA();
    //console.log(bk);

    //const texticon = this.makeMarkerIcon('#583488', this.name);
    const texticon = this.makeMarkerIcon(bgcolorMetaData, fgcolorMetaData, this.name);
    //   const falicon = this.makeMarkerIcon('#583470', '<i class="fa fa-eye" />', true);
    //   const maticon = this.makeMarkerIcon('#583470', '<i class="material-icons">card_travel</i>');
    this.markerInstance = marker(
      otherLatLng, {
      draggable: isDraggable,
      icon: texticon,
    });
    return this.markerInstance;
  }
  // caption could be: '<i class="fa fa-eye" />',
  //makeMarkerIcon(color, cation, isFa = false) {
  makeMarkerIcon(bgcolor: ColorMetaData, fgcolor: ColorMetaData, caption) {
    //let isFa = false
    //let myCustomColour = color + 'd0';
    let myCustomColour = bgcolor.RGBAToHexA();

    let size = 10,// size of the marker
      border = 2; // border thckness
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
    let captionStyles;
    let colorText = fgcolor.RGBAToHexA();
    captionStyles = `
      transform: rotate(-45deg);
      display:block;
      width: ${size * 3}px;
      text-align: center;
      line-height: ${size * 3}px;
      color:${colorText};
      `;
    // if (isFa == true) {
    //   captionStyles = `
    //   transform: rotate(-45deg);
    //   display:block;
    //   width: ${size * 3}px;
    //   text-align: center;
    //   line-height: ${size * 3}px;
    //   `;
    // } else {
    //   captionStyles = `
    //   transform: rotate(-45deg);
    //   display:block;
    //   width: ${size * 3}px;
    //   text-align: center;
    //   line-height: ${size * 3}px;
    //   color:${colorText};
    //   `;
    // }
    let icon = divIcon({
      className: 'color-pin-' + myCustomColour.replace('#', ''),
      iconAnchor: [border, size * 2 + border * 2],
      popupAnchor: [0, -(size * 3 + border)],

      html: `<span style="${markerHtmlStyles}"><span style="${captionStyles}">${caption || ''}</span></span>`
    });

    return icon;
  }
}
