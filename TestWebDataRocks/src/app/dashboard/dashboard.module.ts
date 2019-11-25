import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { WebDataRocksPivot } from '../webdatarocks/webdatarocks.angular4';
import { TestWebdatarockspivotComponent } from './page/test-webdatarockspivot/test-webdatarockspivot.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    TestShowPageComponent,
    WebDataRocksPivot,
    TestWebdatarockspivotComponent,
  ],
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
