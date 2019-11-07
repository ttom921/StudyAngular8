import { MarkerMetaData } from '../model/marker-meta-data.model';
import { Layer, LayerGroup, Marker, LatLngExpression } from 'leaflet';
import { LayerGroupMetaData } from '../model/layer-group-meta-data.model';
import * as _ from 'lodash';
import { ComponentFactoryResolver, Injector } from '@angular/core';
import { HTMLMarkerComponent } from '../htmlmarker/htmlmarker.component';

export class OSMMarkerManager {
  //有關mark的相關資料
  markercollect: MarkerMetaData[] = [];
  layers: Layer[] = [];
  layergroupcollect: LayerGroupMetaData[] = [];
  //layerGroup: LayerGroup[] = [];
  constructor(layers: Layer[],
    private resolver: ComponentFactoryResolver,
    private injector: Injector) {
    this.layers = layers;
  }

  public AddMark(name: string, desc: string, otherLatLng: LatLngExpression, isDraggable: boolean = false, gpname: string = "marks"): MarkerMetaData {
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
    let curmark = new MarkerMetaData(name, desc, otherLatLng);
    let m = curmark.CreateMark(otherLatLng, isDraggable);
    this.markercollect.push(curmark);
    lg.addLayer(m);
    return curmark;


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

  AddPopHtml(markmetadata: MarkerMetaData) {
    //跳出視窗
    // dynamically instantiate a HTMLMarkerComponent
    const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);
    // we need to pass in the dependency injector
    const component = factory.create(this.injector);
    // wire up the @Input() or plain variables (doesn't have to be strictly an @Input())
    let data = {
      name: markmetadata.name,
      description: markmetadata.description,
      position: markmetadata.position
    }
    component.instance.data = data
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
        let findelm = _.find(objparent.markercollect, o => {
          return o.markerInstance == mapmarker
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
