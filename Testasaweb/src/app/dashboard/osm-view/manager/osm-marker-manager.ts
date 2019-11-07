import { MarkerMetaData } from '../marker-meta-data.model';
import { Layer, LayerGroup, Marker } from 'leaflet';
import { LayerGroupMetaData } from '../model/layer-group-meta-data.model';
import * as _ from 'lodash';

export class OSMMarkerManager {
  //有關mark的相關資料
  markercollect: MarkerMetaData[] = [];
  layers: Layer[] = [];
  layergroupcollect: LayerGroupMetaData[] = [];
  //layerGroup: LayerGroup[] = [];
  constructor(layers: Layer[]) {
    this.layers = layers;
  }

  public AddMark() {
    //let lay = this.layerGroup.getLayers();
    //建立基本的marke
    //中心點
    let center = new MarkerMetaData("center marker", "descr 1");
    let m = center.CreateLMark([24.9345812, 121.2728323]);
    this.markercollect.push(center);
    //maker1
    let mark1 = new MarkerMetaData("marker1", "descr marker1");
    mark1.CreateLMark([24.936724298146263, 121.26878929033411]);
    this.markercollect.push(mark1);
    //marker2
    let marker2 = new MarkerMetaData("marker2", "descr marker2");
    marker2.CreateLMark([24.937035613886447, 121.28794670104982]);
    this.markercollect.push(marker2);

    let arr: Marker[] = [];
    this.markercollect.forEach(item => {
      arr.push(item.markerInstance);
    });
    var lg = new LayerGroup([...arr]);
    var lgmetadata = new LayerGroupMetaData();
    this.layergroupcollect.push(lgmetadata);
    lgmetadata.layerGroup = lg;
    this.layers.push(lg);
    //this.layerGroup.push(lg);
    //this.layers.push(lg);

    // //let arr: Marker[] = [];
    // this.markercollect.forEach(item => {
    //   //arr.push(item.markerInstance);
    //   this.layers.push(item.markerInstance);
    // });
  }
  RemoveMark(rvmarkname: string) {
    let fdobj = _.find(this.markercollect, function (o) {
      return o.name == rvmarkname
    });
    if (_.isUndefined(fdobj)) return;

    //移除
    //console.log("orignal->" + this.markercollect);
    _.pull(this.markercollect, fdobj);
    //console.log("remove->" + this.markercollect);

    let lg = _.find(this.layergroupcollect, function (o) {
      return o.name == "default"
    });
    if (_.isUndefined(lg)) return;
    //移除在group中的layer
    lg.layerGroup.removeLayer(fdobj.markerInstance)
  }
}
