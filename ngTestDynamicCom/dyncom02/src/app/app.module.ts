import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { RouteAComponent } from './route-a/route-a.component';
import { RouteBComponent } from './route-b/route-b.component';
import { RouteCComponent } from './route-c/route-c.component';
import { FigA1Component } from './feature/fig-a1/fig-a1.component';
import { FigA2Component } from './feature/fig-a2/fig-a2.component';
import { FigB1Component } from './feature/fig-b1/fig-b1.component';
import { FigB2Component } from './feature/fig-b2/fig-b2.component';
import { FigC1Component } from './feature/fig-c1/fig-c1.component';
import { FigC2Component } from './feature/fig-c2/fig-c2.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteAComponent,
    RouteBComponent,
    RouteCComponent,
    FigA1Component,
    FigA2Component,
    FigB1Component,
    FigB2Component,
    FigC1Component,
    FigC2Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
