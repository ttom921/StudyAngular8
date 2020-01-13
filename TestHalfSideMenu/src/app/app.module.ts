import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { CarListComponent } from './car-list/car-list.component';
import { HomeComponent } from './home/home.component';
import { OsmViewComponent } from './_common/map/osm-view/osm-view.component';

@NgModule({
  declarations: [
    AppComponent,
    OsmViewComponent,
    CarListComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    AppRoutingModule,

  ],
  exports: [
    OsmViewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
