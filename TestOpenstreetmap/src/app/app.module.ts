import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularOpenlayersModule } from "ngx-openlayers";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OsmViewComponent } from './osm-view/osm-view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OsmViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    AngularOpenlayersModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
