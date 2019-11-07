import { Polyline, polyline, LatLngExpression } from 'leaflet';
import * as L from 'leaflet';

export class PolylineMetaData {
  name: String;
  description: String;
  polylineInstance: Polyline;
  // constructor(name: string, description: string) {
  //   this.name = name;
  //   this.description = description;
  // }
  CreatePolyline(latlngs: LatLngExpression[] | LatLngExpression[][]) {
    let color = this.getRandcolor();

    return polyline(latlngs, {
      color: color,
      weight: 5,
      smoothFactor: 1
    });

  }
  getRandcolor() {
    //隨機顏色
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + " ," + g + "," + b + ")";
  }

}
