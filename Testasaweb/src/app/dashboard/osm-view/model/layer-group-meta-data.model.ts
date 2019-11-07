import { LayerGroup } from 'leaflet';

export class LayerGroupMetaData {
  name: string;
  layerGroup: LayerGroup;
  constructor() {
    this.name = "unkinds";
    this.layerGroup = new LayerGroup();
  }
}
