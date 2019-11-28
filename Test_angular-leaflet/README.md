# TestangularLeaflet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.
# 這是測試最單純的leaflet元件
先來安裝leaflet
```
npm install leaflet
npm install --save @types/leaflet
```
加入模組和CSS檔
在`angular.json`中
```json
"styles": [
              "./node_modules/leaflet/dist/leaflet.css",
              "src/styles.scss"
            ],
            "scripts": [
              "./node_modules/leaflet/dist/leaflet.js",
            ]

```

如何使用
```typescript
// declare variable
declare let L;
```
## 建立測試元件
```
ng g component dashboard/page/TestShowPage
```

在`src\app\dashboard\page\test-show-page\test-show-page.component.ts`中在這裏要加人`encapsulation: ViewEncapsulation.None`這那Angular不會額外在html中加入標籤，這樣在leaflet才可以設定元件的style

```typescript
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// declare variable
declare let L;

@Component({
  selector: 'app-test-show-page',
  templateUrl: './test-show-page.component.html',
  styleUrls: ['./test-show-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestShowPageComponent implements OnInit {

  map: L.Map;
  constructor() { }

  ngOnInit() {
    this.map = L.map('mapid', {
      center: [24.9345812, 121.2728323],
      zoom: 14
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
      maxZoom: 18,
    }).addTo(this.map);

    this.TestCircultootip();
  }
  TestCircultootip() {


    var tp = L.tooltip({
      permanent: true,
      direction: 'center',
      className: 'text'
    }).setContent("50");

    let c = new L.CircleMarker([24.9345812, 121.2728323], {
      radius: 30,
      fillColor: "#ff7800",
      color: "#000",
      weight: 2,
      opacity: 0.3,
      fillOpacity: 0.5,
      //title: "test",
      //className: 'leaflet-tooltip'
      //className: 'mytext'
    })
      .bindTooltip(tp)
      .addTo(this.map);
    // var text = L.tooltip({
    //   permanent: true,
    //   direction: 'center',
    //   className: 'text'
    // }).setContent("20")
    //   .setLatLng(c.getLatLng());
    // text.addTo(this.map);


  }

}

```

在`src\app\dashboard\page\test-show-page\test-show-page.component.html`
```html
<div id="mapid">

</div>
```

在`src\app\dashboard\page\test-show-page\test-show-page.component.scss`
```scss
#mapid {
  width: 80vw;
  height: 80vh;
}

.leaflet-tooltip-pane .text {
    color: red;
    font-weight: bold;
    background: transparent;
    border:0;
    box-shadow: none;
    font-size:2em;
}
```




## 參考資料
https://codehandbook.org/use-leaflet-in-angular/
