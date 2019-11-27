import { Injectable } from '@angular/core';
import { LatLngExpression } from 'leaflet';

export class MarkerData {
  id: number;
  name: String;
  description: String;
  position: LatLngExpression
}
@Injectable({
  providedIn: 'root'
})
export class OsmDataService {
  markers: MarkerData[] = [
    {
      id: 1,
      name: 'Marker name 1',
      description: 'descr 1',
      position: [24.9345812, 121.2728323]
    },
    {
      id: 2,
      name: 'Marker name 2',
      description: 'descr 2',
      position: [24.9345812, 121.2728330]
    }
  ];
  constructor() { }
  getMarkers() {
    return this.markers;
  }

  getMarkerById(id) {
    return this.markers.filter((entry) => entry.id === id)[0];
  }
  changeMarkerData() {
    for (let marker of this.markers) {
      // just add a random number at the end
      marker.description = `Some random value ${Math.random() * 100}`;
    }
  }
  
}
