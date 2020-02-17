import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoPlayManagerComponent } from './video-play-manager/video-play-manager.component';
import { BarChartComponent } from './_common/bar-chart/bar-chart.component';
import { TestD3Component } from './_common/test-d3/test-d3.component';
import { TestBarChartComponent } from './_common/test-bar-chart/test-bar-chart.component';
import { LineChartComponent } from './_common/01_line_chart/line-chart/line-chart.component';
import { MultiSeriesComponent } from './_common/02_multi_series_line_chart/multi-series/multi-series.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayManagerComponent,
    BarChartComponent,
    TestD3Component,
    TestBarChartComponent,
    LineChartComponent,
    MultiSeriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
