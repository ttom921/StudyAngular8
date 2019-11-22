import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { CarEventListComponent } from './page/pagelist/car-event-list/car-event-list.component';
import { SimpleBarComponent } from './page/pagecharts/Bar/simple-bar/simple-bar.component';
import { DriverBarComponent } from './page/pagecharts/Bar/driver-bar/driver-bar.component';
import { LineFuelconsumptionComponent } from './page/pagecharts/Line/line-fuelconsumption/line-fuelconsumption.component';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent, TestShowPageComponent, CarEventListComponent, SimpleBarComponent, DriverBarComponent, LineFuelconsumptionComponent],
  imports: [
    NgxEchartsModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  exports: [
    NgxEchartsModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
