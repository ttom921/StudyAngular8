import { Marker, marker, icon, LatLngExpression } from 'leaflet';

export class MarkerMetaData {
  //id: string;
  name: String;
  description: String;
  position: LatLngExpression;
  isDraggable: boolean;
  markerInstance: Marker;
  componentInstance: ComponentRef<HTMLMarkerComponent>
  constructor(name: string, description: string, otherLatLng: LatLngExpression) {
    this.name = name;
    this.description = description;
    this.position = otherLatLng;
    this.isDraggable = false;
  }
  public CreateMark(otherLatLng: LatLngExpression, isDraggable: boolean = false): Marker {
    this.isDraggable = isDraggable;
    this.markerInstance = marker(
      otherLatLng, {
      draggable: isDraggable,
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
