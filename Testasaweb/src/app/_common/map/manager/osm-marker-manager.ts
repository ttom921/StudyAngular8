import { MarkerMetaData } from '../model/marker-meta-data.model';
import { Layer, LatLngExpression } from 'leaflet';
import { LayerGroupMetaData } from '../model/layer-group-meta-data.model';
import { ComponentFactoryResolver, Injector } from '@angular/core';
import * as _ from 'lodash';
import { HTMLMarkerComponent } from '../htmlmarker/htmlmarker.component';
import { ColorMetaData } from '../model/color-meta-data.model';

export class OSMMarkerManager {
  //所有關mark的相關資料
  markerCollect: MarkerMetaData[] = [];
  layers: Layer[] = [];
  layergroupcollect: LayerGroupMetaData[] = [];
  constructor(
    layers: Layer[],
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {
    this.layers = layers;
  }
  public AddMark(name: String, desc: String, otherLatLng: LatLngExpression, bgcolorMetaData: ColorMetaData, fgcolorMetaData: ColorMetaData, isDraggable: boolean = false, gpname = "marks"): MarkerMetaData {
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

    //建立基本的mark
    let curmark = new MarkerMetaData(name, desc, otherLatLng);
    let m = curmark.CreateMark(otherLatLng, bgcolorMetaData, fgcolorMetaData, isDraggable);
    this.markerCollect.push(curmark);
    lg.addLayer(m);
    return curmark;
  }
  UpdateMark(updatname: String, otherLatLng: LatLngExpression) {
    let fdobj = _.find(this.markerCollect, function (o) {
      return o.name == updatname;
    });
    if (_.isUndefined(fdobj)) return;
    fdobj.position = otherLatLng;
    fdobj.markerInstance.setLatLng(fdobj.position);
  }
  public RemoveMark(rvmarkname: String) {
    let fdobj = _.find(this.markerCollect, function (o) {
      return o.name == rvmarkname;
    });
    if (_.isUndefined(fdobj)) return;

    //移除
    //console.log("orignal->" + this.markercollect);
    _.pull(this.markerCollect, fdobj);
    //console.log("remove->" + this.markercollect);

    let lg = _.find(this.layergroupcollect, function (o) {
      return o.name == "marks";
    });
    if (_.isUndefined(lg)) return;
    //移除在group中的layer
    lg.layerGroup.removeLayer(fdobj.markerInstance);
  }
  GetLayerByName(gpname: String): LayerGroupMetaData {
    let lgmetadata = _.find(this.layergroupcollect, o => {
      return o.name == gpname;
    });
    if (_.isUndefined(lgmetadata)) return null;
    return lgmetadata;
  }
  AddPopHtml(markmetadata: MarkerMetaData) {
    //跳出視窗
    //dynamically instantiate a HTMLMarkerComponent
    const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);
    // we need to pass in the dependency injector
    const component = factory.create(this.injector);
    // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
    let data = {
      name: markmetadata.name,
      description: markmetadata.description,
      position: markmetadata.position
    };

    component.instance.data = data;
    markmetadata.componentInstance = component;

    //拖拉
    if (markmetadata.isDraggable) {
      let objparent = this;
      markmetadata.markerInstance.on('dragend', function (event) {
        let mapmarker = event.target;
        let position = mapmarker.getLatLng();
        let popupelm = mapmarker.getPopup();
        //let fmt: string = `lat:${position.lat} lng:${position.lng}`;
        //console.log(fmt);
        let findelm = _.find(objparent.markerCollect, o => {
          return o.markerInstance == mapmarker;
        });
        if (!_.isUndefined(findelm)) {
          findelm.componentInstance.instance.data.position = position;
          component.changeDetectorRef.detectChanges();
        }

      });
    }
    // pass in the HTML from our dynamic component
    const popupContent = component.location.nativeElement;
    // we need to manually trigger change detection on our in-memory component
    // s.t. its template syncs with the data we passed in
    component.changeDetectorRef.detectChanges();
    // add popup functionality
    markmetadata.markerInstance.bindPopup(popupContent).openPopup();
  }
}
