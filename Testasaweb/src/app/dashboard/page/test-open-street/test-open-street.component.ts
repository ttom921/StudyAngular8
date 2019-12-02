import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OsmViewComponent } from 'src/app/_common/map/osm-view/osm-view.component';
import { LayerGroup, marker, icon, CircleMarker, tooltip, LatLngExpression } from 'leaflet';
import { OsmDataService } from 'src/app/_services/map/osm-data.service';
import { MarkerData, MarkerMetaData } from 'src/app/_common/map/model/marker-meta-data.model';
import { ColorMetaData } from 'src/app/_common/map/model/color-meta-data.model';

@Component({
  selector: 'app-test-open-street',
  templateUrl: './test-open-street.component.html',
  styleUrls: ['./test-open-street.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TestOpenStreetComponent implements OnInit {

  @ViewChild('osmview', { static: true }) osmview: OsmViewComponent
  markdatas = [];
  constructor(
    private osmDataService: OsmDataService,
  ) { }

  ngOnInit() {
  }
  tempmarkdata: MarkerData = {
    id: `1`,
    name: 'Markername1',
    description: 'descr 1',
    position: [24.9345812, 121.2728323]
  };
  OnUpdaet() {

    this.osmDataService.getInterval().subscribe(data => {
      //console.log(data);
      this.markdatas.forEach(item => {
        let rdnum = this.generaterRandomMove();
        item.position[0] = item.position[0] + rdnum;
        item.position[1] = item.position[1] + rdnum;
        this.osmview.osmMarkerManager.UpdateMark(item.name, item.position);

      });
    });
    // this.tempmarkdata.position[0] = this.tempmarkdata.position[0] + 0.0001;
    // this.osmview.osmMarkerManager.UpdateMark(this.tempmarkdata.name, this.tempmarkdata.position);
    // console.log(this.tempmarkdata);

    // this.osmDataService.getMarkers().subscribe(data => {
    //   console.log(data);
    //   let makedata = data[0];
    //   makedata.position[0] = makedata.position[0] + 0.000001;
    //   this.osmview.osmMarkerManager.UpdateMark(makedata.name, makedata.position);
    // });
  }
  OnClick() {
    this.osmview.PrintDebugInfo();
    let startpos = [24.9345812, 121.2728323]

    for (let index = 0; index < 50; index++) {
      let rdnum = this.generateRandomNumber();
      let rampos: LatLngExpression = [
        startpos[0] + this.generateRandomNumber(),
        startpos[1] + this.generateRandomNumber()
      ]
      let tempmarkdata: MarkerData = {
        id: `${index}`,
        name: `name${index}`,
        description: 'descr 1',
        position: rampos
      };
      let bgcolorMetaData = new ColorMetaData();
      bgcolorMetaData.SetDefaultBGcolor();
      bgcolorMetaData.getRandomColor();
      let fgcolorMetaData = new ColorMetaData();
      fgcolorMetaData.SetDefatulFGColor();
      fgcolorMetaData.getRandomColor();
      this.osmview.AddMarkPosition(tempmarkdata, bgcolorMetaData, fgcolorMetaData);
      this.markdatas.push(tempmarkdata);
      //this.osmview.
    }

    // this.osmDataService.getMarkers().subscribe(data => {
    //   //console.log(data);
    //   this.osmview.TestMarkFun(data);
    // });

    // let marklayerGroup = new LayerGroup();
    // var TooltipClass = {
    //   'className': 'class-tooltip'
    // }
    // var tp = tooltip({
    //   permanent: true,
    //   direction: 'center',
    //   className: 'myCSSClass'
    // }).setContent("50");
    // let c = new CircleMarker([24.9345812, 121.2728323], {
    //   radius: 30,
    //   fillColor: "#ff7800",
    //   color: "#000",
    //   weight: 1,
    //   opacity: 1,
    //   fillOpacity: 0.8,
    //   //title: "test",
    //   //className: 'leaflet-tooltip'
    //   //className: 'mytext'
    // }).bindTooltip(tp);

    // // let mytoolitps = () => {
    // //   let tpl = `<h1> tooltips <h1><p>test massage for tooltips</p>`;
    // //   return tpl;
    // // };
    // let m = marker([24.9345812, 121.2728323], {
    //   draggable: true,
    //   icon: icon({
    //     iconSize: [25, 41],
    //     iconAnchor: [13, 41],
    //     iconUrl: 'leaflet/marker-icon.png',
    //     shadowUrl: 'leaflet/marker-shadow.png'
    //   }),
    // });



    // marklayerGroup.addLayer(m);
    // m.bindTooltip(tp);
    // // // 为 tooltips 指定 class 类名
    // // m.bindTooltip(mytoolitps, { className: "sample-tooltips" });

    // let circlelayerGroup = new LayerGroup();
    // circlelayerGroup.addLayer(c);
    // this.osmview.layersControl = {
    //   overlays: {
    //     "mmmark": marklayerGroup,
    //     "ccmark": circlelayerGroup,
    //   }
    // };
    // //this.map.addLayer(this.layersControl.overlays[this.cafeLayerName]);
    // this.osmview.map.addLayer(this.osmview.layersControl["overlays"]["mmmark"]);
    // //this.osmview.map.addLayer(this.osmview.layersControl["overlays"]["ccmark"]);
    // //this.osmview.map.invalidateSize();
  }
  generateRandomNumber() {
    let min = 0.002;
    let max = 0.008;
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let highlightedNumber = Math.random() * (max - min) + min;

    //alert(highlightedNumber);
    return highlightedNumber * plusOrMinus;
  }
  generaterRandomMove() {
    let min = 0.0001;
    let max = 0.0008;
    let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    let highlightedNumber = Math.random() * (max - min) + min;

    //alert(highlightedNumber);
    return highlightedNumber * plusOrMinus;
  }
}
