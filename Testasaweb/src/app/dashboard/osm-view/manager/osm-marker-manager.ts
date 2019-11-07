import { MarkerMetaData } from '../model/marker-meta-data.model';
import { Layer, LayerGroup, Marker, LatLngExpression } from 'leaflet';
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

  public AddMark(name: string, desc: string, otherLatLng: LatLngExpression, isDraggable: boolean = false, gpname: string = "marks"): Marker {
    //檢查是否有存在的layoutgroup
    let lg = undefined;
    let lgmetadata = _.find(this.layergroupcollect, o => {
      return o.name == gpname;
    });
    if (_.isUndefined(lgmetadata)) {
      lgmetadata = new LayerGroupMetaData();
      lgmetadata.name = "marks";
      this.layergroupcollect.push(lgmetadata);
      lg = lgmetadata.layerGroup;
      this.layers.push(lg);
    }
    lg = lgmetadata.layerGroup;
    //建立基本的marke
    let curmark = new MarkerMetaData(name, desc);
    let m = curmark.CreateMark(otherLatLng);
    this.markercollect.push(curmark);
    lg.addLayer(m);
    return m;


    // //中心點
    // let center = new MarkerMetaData("center marker", "descr 1");
    // let m = center.CreateLMark([24.9345812, 121.2728323]);
    // this.markercollect.push(center);
    // //maker1
    // let mark1 = new MarkerMetaData("marker1", "descr marker1");
    // mark1.CreateLMark([24.936724298146263, 121.26878929033411]);
    // this.markercollect.push(mark1);
    // //marker2
    // let marker2 = new MarkerMetaData("marker2", "descr marker2");
    // marker2.CreateLMark([24.937035613886447, 121.28794670104982]);
    // this.markercollect.push(marker2);

    // let arr: Marker[] = [];
    // this.markercollect.forEach(item => {
    //   arr.push(item.markerInstance);
    // });

    // arr.forEach(item => {
    //   lg.addLayer(item);
    // });




    //var lg = new LayerGroup([...arr]);
    //let lg = new LayerGroup();

    //lgmetadata.layerGroup = lg;

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
      return o.name == "marks"
    });
    if (_.isUndefined(lg)) return;
    //移除在group中的layer
    lg.layerGroup.removeLayer(fdobj.markerInstance)
  }
}
