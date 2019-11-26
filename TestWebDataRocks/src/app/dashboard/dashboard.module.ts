import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { GoogleChartsModule } from 'angular-google-charts';


import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { WebDataRocksPivot } from '../webdatarocks/webdatarocks.angular4';
import { TestWebdatarockspivotComponent } from './page/test-webdatarockspivot/test-webdatarockspivot.component';
import { TestGoogleChartComponent } from './page/test-google-chart/test-google-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    TestShowPageComponent,
    WebDataRocksPivot,
    TestWebdatarockspivotComponent,
    TestGoogleChartComponent,
  ],
  imports: [
    GoogleChartsModule.forRoot(),
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  exports: [
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
