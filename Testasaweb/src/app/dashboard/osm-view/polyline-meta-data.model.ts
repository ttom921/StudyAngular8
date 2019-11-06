import { Polyline, polyline } from 'leaflet';

export class PolylineMetaData {
  name: String;
  description: String;
  polylineInstance: Polyline;
  CreatePolyline(...ary) {
    return polyline([ary])

  }
}
