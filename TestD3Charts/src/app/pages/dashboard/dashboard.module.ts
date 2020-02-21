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


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent, Ch01HelloWorldComponent, Ch02SelBindComponent, Ch03UEEdataComponent],
  imports: [
    CommonModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
