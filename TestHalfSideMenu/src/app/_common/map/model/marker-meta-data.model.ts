import { LatLngExpression, Marker, LatLng, latLng, DivIcon } from 'leaflet';
import * as L from 'leaflet';
import { GPSStatus } from './gpsstatus.enum';

export interface MarkerData {
  id: string;//保留
  car_uid: string;// Example: ABC-123 車牌.
  car_group_name: string;// Example: XXXXXXXX Car Group 名稱.
  name: string;//公司名稱
  description: string;
  position: LatLngExpression;
  markerInstance: Marker;
}
/**
 * Mark的中繼資料
 * @export
 * @class MarkerMetaData
 * @implements {MarkerData}
 */
export class MarkerMetaData implements MarkerData {
  id: string;
  car_uid: string;
  car_group_name: string;
  name: string;
  description: string;
  position: LatLng;
  markerInstance: Marker;

  size = 10;// size of the marker
  border = 2; // border thckness
  gpsstatus: GPSStatus;//GPS狀態
  head: number;//車頭方向
  hide: boolean;//是否顯示

  //#region 顯示ICON相關

  UpdatePos(otherLatLng: LatLngExpression) {
    this.position = latLng(otherLatLng);
    this.markerInstance.setLatLng(otherLatLng);
  }
  UpdateGPSStatus(gpsstatus: GPSStatus) {
    this.gpsstatus = gpsstatus;
    //this.UpdateHTML();
  }
  UpdateHeading(angle: number) {
    this.head = angle;
    //this.UpdateHTML();
    // let car_uid = this.car_uid;
    // let el: HTMLElement = jQuery(car_uid)
    // if (!el) return;
    // //console.log(el);
    // let elmove = jQuery(`#${car_uid}`).children().eq(2);
    // elmove.css({ "transform": `rotate(${angle}deg)` });
  }
  UpdateHTML() {
    let icon = this.GetdivIcon();
    this.markerInstance.setIcon(icon);
  }
  // ConverGPSStatus(carstatus: itCarinfo_Car_Status) {
  //   switch (carstatus.id) {
  //     case 1://online
  //       return GPSStatus.GPS_ONLine;
  //     case 2://offline
  //       return GPSStatus.GPS_OFFLine;
  //     case 3://move
  //       return GPSStatus.GPS_MOVE;
  //   }
  // }
  //取得divIcon的html
  private getdivIconhtml(): string {
    //建立GPS狀態
    let hlgpson = "none";
    let hlgpsoff = "none";
    let hlgpsmove = "none";
    //let gpsstate = "gpsoffline";
    switch (this.gpsstatus) {
      case GPSStatus.GPS_ONLine:
        hlgpson = "";
        break;
      case GPSStatus.GPS_OFFLine:
        hlgpsoff = "";
        break;

      case GPSStatus.GPS_MOVE:
        hlgpsmove = "";
        break;
    }
    let caption = this.car_uid;
    let captionStyles = this.getcaptionStyles();
    let isAllVisiable = this.hide == true ? "none" : "";
    let strhtml = `<div id=${caption} style="display:${isAllVisiable};" >
    <div class="gpsonline" style="display:${hlgpson};" >
    </div>
    <div class="gpsoffline" style="display:${hlgpsoff};">
    </div>
    <div style="width:0;height:0;border-style: solid;border-width: 0 7px 28px 7px;border-color: transparent transparent #00ff26 transparent;
    transform: rotate(${this.head}deg);
    display:${hlgpsmove};">
    </div>
    <span style="${captionStyles}">${caption || ''}</span>
  </div>`;
    return strhtml
  }
  //取得車牌的顯示
  getcaptionStyles(): string {
    let captionStyles;
    //let colorText = fgcolor.RGBAToHexA();
    captionStyles = `
      background-color:#666363bd;
      color: #ffffff;
      display:block;
      width: ${this.size * 12}px;
      text-align: center;
      line-height: ${this.size * 2}px;
      margin-top: -${this.size * 9 / 2}px;
      margin-left: -${this.size * 9 / 2}px;
      font-size: 14px;
      `;
    return captionStyles;
  }
  //取得顯示的DivIcon
  GetdivIcon(): DivIcon {
    let icon = L.divIcon({
      className: 'color-pin-666363bd',
      iconAnchor: [this.border, this.size * 2 + this.border * 2],
      popupAnchor: [0, -(this.size * 3 + this.border)],
      html: this.getdivIconhtml()
    });
    return icon;
  }
  //#endregion

}
