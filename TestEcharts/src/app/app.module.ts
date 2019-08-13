import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SimpleChartComponent } from './charts/simple-chart/simple-chart.component';
import { SimpleBarComponent } from './charts/simple-bar/simple-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { BasicLineComponent } from './charts/line/basic-line/basic-line.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleChartComponent,
    SimpleBarComponent,
    BasicLineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxEchartsModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
