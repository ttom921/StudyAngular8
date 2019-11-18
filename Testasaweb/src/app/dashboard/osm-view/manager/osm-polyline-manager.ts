import { PolylineMetaData } from '../model/polyline-meta-data.model';
import { Layer, Polyline, LatLngExpression } from 'leaflet';
import { LayerGroupMetaData } from '../model/layer-group-meta-data.model';
import * as _ from 'lodash';


export class OSMPolylineManager {
  //有關polyline的相關資料
  polylinecollect: PolylineMetaData[] = [];
  layers: Layer[] = [];
  layergroupcollect: LayerGroupMetaData[] = [];
  constructor(layers: Layer[]) {

    this.layers = layers;
  }
  /**
   * AddPolyline
name:string,dest:string,[],   */
  public AddPolyline(latlngs: LatLngExpression[] | LatLngExpression[][], gpname: string = "polyline"): Polyline {



    //檢查是否有存在的layoutgroup
    let lg = undefined;
    let lgmetadata = _.find(this.layergroupcollect, o => {
      return o.name == gpname;
    });
    if (_.isUndefined(lgmetadata)) {
      lgmetadata = new LayerGroupMetaData();
      lgmetadata.name = "polyline";
      this.layergroupcollect.push(lgmetadata);
      lg = lgmetadata.layerGroup;
      this.layers.push(lg);
    }
    lg = lgmetadata.layerGroup;
    //建本基本的polyline
    let curpolyline = new PolylineMetaData();
    let p = curpolyline.CreatePolyline(latlngs);
    this.polylinecollect.push(curpolyline);
    lg.addLayer(p);
    return p;
  }
}
