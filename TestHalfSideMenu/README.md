# TestHalfSideMenu

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

加入AngularMateial

```
ng add @angular/material
```

加入SharedAngularMaterial <https://ithelp.ithome.com.tw/articles/10209937

```
ng g m share\SharedAngularMaterial
```

在MatIcon中使用SVG

必須透過Angular提供的DomSanitizer Service來信任這個路徑。接著我們就可以透過MatIconRegistry來擴充SVG icon

```typescript
export class SharedAngularMaterialModule implements OnInit {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.ngOnInit();
  }
  ngOnInit(): void {
    // this.matIconRegistry.addSvgIconInNamespace(
    //   "custom-svg",
    //   "angular",
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/angular_solidBlack.svg")
    // );
  }
```

## 在MatIcon中使用Icon Font

```bash
npm install --save @fortawesome/fontawesome-free
```

接下來在src\styles.scss中

```scss
@import "~@fortawesome/fontawesome-free/css/all.css";
```

## 加人dashboard的模組

```
ng g m dashboard --routing
```

### 加人dashboard的元件

```
ng g component dashboard
```

在`src\app\dashboard\dashboard.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  exports: [
    CommonModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
```

## 設定module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 設定路由

在`src\app\app-routing.module.ts`

```typescript
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
];
```

在`src\app\dashboard\dashboard-routing.module.ts`

```typescript
const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      // {
      //   path:'',compont:xxxxComponent
      // }
    ]
  },
];
```

## 設定SCSS

### 設定全域的SCSS

```scss
@import "~@fortawesome/fontawesome-free/css/all.css";
//使mat-car有作用
mat-card{
  margin:4px;
}
//寬度為填滿
.full-width{
  width: 100%;
}
html, body, app-root, .site {
  margin: 0;
  width: 100%;
  height: 100%;
}
.main {
  display: flex;
  flex-direction: column;
}
```

在`src\app\dashboard\dashboard.component.html`

```html
<mat-drawer-container class="site mat-typography" autosize>
  <mat-drawer #drawer mode="side" disableClose="true" opened="true">
    <button mat-mini-fab (click)="isExpanded = !isExpanded" color="warn" style="margin: 10px;">
      <!-- <mat-icon aria-label="Menu">menu</mat-icon> -->
      <mat-icon *ngIf="isExpanded">arrow_left</mat-icon>
      <mat-icon *ngIf="!isExpanded">arrow_right</mat-icon>
    </button>
    <mat-nav-list>
      <mat-list-item>
        <mat-icon mat-list-icon>person</mat-icon>
        <h4 mat-line *ngIf="isExpanded">Management A1111111111</h4>
      </mat-list-item>
      <mat-list-item>
        <mat-icon mat-list-icon>assignment</mat-icon>
        <h4 mat-line *ngIf="isExpanded">Management B</h4>
      </mat-list-item>
      <mat-list-item>
        <mat-icon mat-list-icon>domain</mat-icon>
        <h4 mat-line *ngIf="isExpanded">Management C</h4>
      </mat-list-item>
      <mat-list-item>
        <mat-icon mat-list-icon>folder_shared</mat-icon>
        <h4 mat-line *ngIf="isExpanded">Management X</h4>
      </mat-list-item>

    </mat-nav-list>
  </mat-drawer>

  <div class="main example-sidenav-content">
    You cards and screen Contents goes here..
    Will be pushed towards right on expanding side navbar.
  </div>
</mat-drawer-container>
```

在`src\app\dashboard\dashboard.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isExpanded = false;
  constructor() { }

  ngOnInit() {
  }

}
```

在加入兩個元件

```
ng g component CarList
ng g component home
```





## 參考資料

https://stackoverflow.com/questions/46835554/angular-material-side-bar-with-half-side-mode

https://stackblitz.com/edit/angular-8zy3pi?file=src%2Fapp%2Fcomponents%2Fleft-menu%2Fleft-menu.component.html

