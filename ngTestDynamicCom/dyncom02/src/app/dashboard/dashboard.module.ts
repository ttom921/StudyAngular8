import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { FigA1Component } from '../feature/fig-a1/fig-a1.component';
import { FigB1Component } from '../feature/fig-b1/fig-b1.component';
import { FigA2Component } from '../feature/fig-a2/fig-a2.component';
import { FigB2Component } from '../feature/fig-b2/fig-b2.component';
import { FigC1Component } from '../feature/fig-c1/fig-c1.component';
import { FigC2Component } from '../feature/fig-c2/fig-c2.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  entryComponents: [FigA1Component, FigA2Component, FigB1Component, FigB2Component, FigC1Component, FigC2Component],
})
export class DashboardModule { }
