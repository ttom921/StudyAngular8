import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TestOpenStreetComponent } from './page/test-open-street/test-open-street.component';
import { OsmViewComponent } from './osm-view/osm-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [DashboardComponent, HeaderComponent, SidebarComponent, TestOpenStreetComponent, OsmViewComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedAngularMaterialModule,
    LeafletModule,
    DashboardRoutingModule
  ],
  exports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedAngularMaterialModule,
    LeafletModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
