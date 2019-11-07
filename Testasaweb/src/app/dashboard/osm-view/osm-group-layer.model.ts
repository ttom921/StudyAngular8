import { LayerGroup, Marker, Layer, marker, polyline } from 'leaflet';
import * as L from 'leaflet';
import { MarkerMetaData } from './model/marker-meta-data.model';
import { isNullOrUndefined } from 'util';
import { PolylineMetaData } from './model/polyline-meta-data.model';

export class OSMGroupLayer {
  id: string;
  name: string;
  enabled: true;
  layers: Layer[] = [];
  layerGroup: LayerGroup;
  // layer: Layer;
  constructor() {
    //this.layerGroup = L.layerGroup(this.layer);
    //this.layer = new Layer();
  }
}
//有關Polyline group
export class OSMPolylineOSMGroupLayer extends OSMGroupLayer {
  //有關polyline的相關資料
  polinecollect: PolylineMetaData[] = [];
  constructor(layers: Layer[]) {
    super();
    this.layers = layers;
    //this.layerGroup = L.layerGroup(this.layers);
    //this.layer = new Layer();
  }
  public AddPolyline() {
    //this.layers=
    let line = new PolylineMetaData();
    //line.CreatePolyline()
    this.layers.push(polyline([[24.936724298146263, 121.26878929033411], [24.937035613886447, 121.28794670104982]]));
    //this.layers.push(line.CreatePolyline([[24.936724298146263, 121.26878929033411], [24.937035613886447, 121.28794670104982]]));

  }
}
//有關marks
export class OSMMarkerOSMGroupLayer extends OSMGroupLayer {
  //有關mark的相關資料
  markercollect: MarkerMetaData[] = [];
  constructor(layers: Layer[]) {
    super();
    this.layers = layers;
  }
  public AddMark() {
    //let lay = this.layerGroup.getLayers();
    //建立基本的marke
    //中心點
    let center = new MarkerMetaData("center marker", "descr 1");
    let m = center.CreateMark([24.9345812, 121.2728323]);
    this.markercollect.push(center);
    //maker1
    let mark1 = new MarkerMetaData("marker1", "descr marker1");
    mark1.CreateMark([24.936724298146263, 121.26878929033411]);
    this.markercollect.push(mark1);
    //marker2
    let marker2 = new MarkerMetaData("marker2", "descr marker2");
    marker2.CreateMark([24.937035613886447, 121.28794670104982]);
    this.markercollect.push(marker2);

    //let arr: Marker[] = [];
    this.markercollect.forEach(item => {
      //arr.push(item.markerInstance);
      this.layers.push(item.markerInstance);
    });
    //this.layers.push(...arr);
    //this.layer = marker([m, mark1]);
    //Layer.
    //this.layerGroup.addLayer(...Layerarr);
    //this.layers.push(...arr);
    //this.markgroupLayer = L.layerGroup([center.markerInstance, mark1.markerInstance, marker2.markerInstance]);
    //this.layerGroup.getLayer() = L.layerGroup(arr);
  }
  public RemoveMark(markname: string) {
    let findarr = this.markercollect.find(function (item) {
      if (item.name == markname) return true;
    })
    if (!isNullOrUndefined(findarr)) {
      for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i] === findarr.markerInstance) {
          this.layers.splice(i, 1);
        }
      }
    }

  }
}
