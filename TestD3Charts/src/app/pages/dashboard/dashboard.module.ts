import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SharedAngularMaterialModule } from 'src/app/share/shared-angular-material/shared-angular-material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Ch01HelloWorldComponent } from '../ch01-hello-world/ch01-hello-world.component';
import { Ch02SelBindComponent } from '../ch02-sel-bind/ch02-sel-bind.component';
import { Ch03UEEdataComponent } from '../ch03-ueedata/ch03-ueedata.component';
import { Ch04ElmsidComponent } from '../ch04-elmsid/ch04-elmsid.component';
import { Ch05SimplebarComponent } from '../ch05-simplebar/ch05-simplebar.component';
import { Ch06ScaleComponent } from '../ch06-scale/ch06-scale.component';
import { MenuListItemComponent } from 'src/app/_common/menu-list-item/menu-list-item.component';
import { Ch07AxisComponent } from '../ch07-axis/ch07-axis.component';
import { Ch08BarChartComponent } from '../ch08-bar-chart/ch08-bar-chart.component';
import { Ch09BarcharAniComponent } from '../ch09-barchar-ani/ch09-barchar-ani.component';
import { Ch10InteractiveComponent } from '../ch10-interactive/ch10-interactive.component';
import { Ch11PieChartComponent } from '../ch11-pie-chart/ch11-pie-chart.component';
import { Ch12ForceDirectedGraphComponent } from '../ch12-force-directed-graph/ch12-force-directed-graph.component';


@NgModule({
  declarations: [DashboardComponent, MenuListItemComponent, HeaderComponent, SidebarComponent,
    Ch01HelloWorldComponent,
    Ch02SelBindComponent,
    Ch03UEEdataComponent,
    Ch04ElmsidComponent,
    Ch05SimplebarComponent,
    Ch06ScaleComponent,
    Ch07AxisComponent,
    Ch08BarChartComponent,
    Ch09BarcharAniComponent,
    Ch10InteractiveComponent,
    Ch11PieChartComponent,
    Ch12ForceDirectedGraphComponent
  ],
  imports: [
    CommonModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
