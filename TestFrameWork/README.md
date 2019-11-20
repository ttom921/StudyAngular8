# TestFrameWork

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

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

## 加入AngularMateial

```
ng add @angular/material
```

目前選擇`Purple/Green `
加入theme設定
在’styles.scss’中,有四種選一種

```scss
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
@import "~@angular/material/prebuilt-themes/purple-green.css";
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
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
@import "~@angular/material/prebuilt-themes/purple-green.css";
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



### 加入頭和側邊框

```
ng g component dashboard/Header
ng g component dashboard/Sidebar
```

## 加入404頁

```
ng g c error-pages/PathNotFound
```

## 設定module

在`src\app\app.module.ts`

```typescript
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathNotFoundComponent } from './error-pages/path-not-found/path-not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    PathNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

在`src\app\dashboard\dashboard.module.ts`

```typescript
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent],
  imports: [
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  exports: [
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

```

## 設定路由

在`src\app\app-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathNotFoundComponent } from './error-pages/path-not-found/path-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '404', component: PathNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

在`src\app\dashboard\dashboard-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      // {
      //   path:'',compont:xxxxComponent
      // }
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
```



## 設定SCSS

### 設定全域的SCSS

```scss
//@import "~@angular/material/prebuilt-themes/deeppurple-amber.css";
//@import "~@angular/material/prebuilt-themes/indigo-pink.css";
//@import "~@angular/material/prebuilt-themes/pink-bluegrey.css";
@import "~@angular/material/prebuilt-themes/purple-green.css";
@import "~@fortawesome/fontawesome-free/css/all.css";
//使mat-car有作用
mat-card{
  margin:4px;
}
//寬度為填滿
.full-width{
  width: 100%;
}
html, body, app-root, mat-sidenav-container, .site {
  margin: 0;
  width: 100%;
  height: 100%;

}
.site {
  display: flex;
  flex-direction: column;

}
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:64px;
}
.fill-remaining-space {
  // 使用 flexbox 填充剩余空间
  // @angular/material 中的很多控件使用了 flex 布局
  flex: 1 1 auto;
}
//#region 以下是自定義字型大小
.mat-raised-button {
  font-size: 18px;
}
// .mat-list-base .mat-list-item .mat-line:nth-child(n+2) {
//   font-size: 18px;
// }
.mat-line {
  font-size: 18px !important;
}
.mat-list-base .mat-list-option {
  font-size: 18px;
}
.mat-header-cell{
  font-size: 14px;
}
.mat-cell{
  font-size: 18px;
}

//#endregion 以下是自定義字型大小
```

## 設定DashboardComponent

設定`src\app\dashboard\dashboard.component.html`

```html
<header>
  <app-header (toggle)="sidenav.toggle()"></app-header>
</header>
<mat-sidenav-container>
  <mat-sidenav #sidenav mode="over" [autoFocus]="false">
    <app-sidebar (navClicked)="sidenav.close()"></app-sidebar>
  </mat-sidenav>

  <mat-sidenav-content #benji>
    <div class="site">

      <main>
        <router-outlet #cite (activate)="onActivate($event)"></router-outlet>
      </main>

    </div>
  </mat-sidenav-content>


</mat-sidenav-container>

```

在`src\app\dashboard\dashboard.component.ts`

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('benji', { static: false }) el !: MatSidenavContent;
  constructor() { }

  ngOnInit() {
  }
  onActivate(event) {
    //讓內容移到最上面
    if (this.el && this.el.getElementRef().nativeElement) {
      this.el.getElementRef().nativeElement.scrollTop = 0;
    }
  }
}

```

##  設定HeaderComponent

在`src\app\dashboard\header\header.component.html`

```html
<mat-toolbar color="primary">
  <button mat-icon-button (click)="onClick()">
    <mat-icon>menu</mat-icon>
  </button>
  <span></span>
  <!-- 在這之後的都會被推到右邊去 -->
  <span class="fill-remaining-space"></span>

  <mat-icon matPrefix style="margin-right: 10px;font-size: 24px;">account_circle</mat-icon>
  <span style="margin-right: 32px;">{{user_id}}</span>

  <button mat-icon-button>
    <mat-icon>exit_to_app</mat-icon>
  </button>

</mat-toolbar>
```



在`src\app\dashboard\header\header.component.ts`

```typescript
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();
  user_id: string = "測試用"
  constructor() { }

  ngOnInit() {
  }
  onClick() {
    this.toggle.emit();
  }
}
```
在`src\app\dashboard\header\header.component.scss`

```scss
.mat-toolbar {
  position: fixed;
  height: 64px;
  top: 0;
  z-index: 2;
}
```

## 建立測試頁面

```
ng g component dashboard/page/testShowPage
```

在`src\app\dashboard\page\test-show-page\test-show-page.component.html`

```html
<p>test-show-page works!</p>
<div style="width: 80vw;height: 70vh;background-color: aqua;">

</div>
```



## 設定SidebarComponent

在`src\app\dashboard\sidebar\sidebar.component.html`

```html
<mat-nav-list style="margin-top: 64px;width:192px;" color="primary">
  <!-- <h3 matSubheader>示範用頁面</h3> -->
  <mat-list-item [routerLink]="['/','dashboard','testshowpage']" (click)="handleClicked($event)">
    <mat-icon md-list-icon>dns</mat-icon>OpenTestShow <span style="width: 100%;"></span>
    <mat-icon matSuffix class="SufficIcon">keyboard_arrow_right</mat-icon>
  </mat-list-item>


  <mat-divider></mat-divider>
  <!-- 另外一組選單 -->
  <!-- <h3 matSubheader>其他頁面</h3> -->
  <!-- <a [routerLink]="['/']" mat-list-item>首頁</a>
        <a [routerLink]="['/']" mat-list-item>Google</a>
        <a [routerLink]="['/']" mat-list-item>Facebook</a> -->
</mat-nav-list>

```

在`src\app\dashboard\sidebar\sidebar.component.ts`

```typescript
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navClicked = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  handleClicked(ev: Event) {
    ev.preventDefault();
    this.navClicked.emit();
  }
}
```
在`src\app\dashboard\sidebar\sidebar.component.scss`

```scss
.mat-icon{
  margin-right: 12px;
}
.SufficIcon{
  margin:0px;
}
```

## 設定DashboardRoutingModule

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'testshowpage', pathMatch: 'full' },
      { path: 'testshowpage', component: TestShowPageComponent, }
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

```

