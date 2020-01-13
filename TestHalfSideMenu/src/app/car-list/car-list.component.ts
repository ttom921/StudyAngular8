import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { OsmViewComponent } from '../_common/map/osm-view/osm-view.component';
declare var jQuery: any;
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CarListComponent implements OnInit, AfterViewInit {

  @ViewChild('osmmap', { static: true }) osmap: OsmViewComponent;
  eventlistcollapns = false;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    //設定初始位置和顯示
    //this.osmap.map.setView(new L.LatLng(40.737, -73.923), this.osmap.map.getMaxZoom());
    //this.osmap.map.setView([24.9345812, 121.2728323], this.osmap.map.getMaxZoom());
    this.osmap.map.setView([24.9345812, 121.2728323], 10);
    this.osmap.map.invalidateSize();



  }
  onSideEvent(ev) {
    // console.log("this.eventlistcollapns=" + this.eventlistcollapns);
    // console.log("ev=" + ev);
    this.eventlistcollapns = !ev;
    console.log(this.eventlistcollapns);
  }


}
