import { Marker, marker, icon, LatLngExpression } from 'leaflet';

export class MarkerMetaData {
  //id: string;
  name: String;
  description: String;
  markerInstance: Marker;
  //componentInstance: ComponentRef<HTMLMarkerComponent>
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  public CreateLMark(otherLatLng: LatLngExpression): Marker {
    this.markerInstance = marker(
      otherLatLng, {
      draggable: true,
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      }),
    });
    return this.markerInstance;
  }
}
