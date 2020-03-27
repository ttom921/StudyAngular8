import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedAngularMaterialModule } from 'src/app/share/shared-angular-material/shared-angular-material.module';
import { MenuListItemComponent } from 'src/app/_common/menu-list-item/menu-list-item.component';
import { BarComponent } from '../angular-progress-bars/bar/bar.component';
import { AngularProgressBarsComponent } from '../angular-progress-bars/angular-progress-bars.component';
import { SvgbarComponent } from '../angular-progress-bars/svgbar/svgbar.component';
import { SpinnerComponent } from '../angular-progress-bars/spinner/spinner.component';
import { NgCircleProgressComponent } from '../ng-circle-progress/ng-circle-progress.component';
import { CircleProgressComponent } from '../../_common/circle-progress/circle-progress.component';
import { NgTestSilderComponent } from '../ng-test-silder/ng-test-silder.component';
import { NgTestAnimateComponent } from '../ng-test-animate/ng-test-animate.component';

@NgModule({
  declarations: [DashboardComponent, MenuListItemComponent, HeaderComponent, SidebarComponent,
    AngularProgressBarsComponent,
    BarComponent,
    SvgbarComponent,
    SpinnerComponent,
    NgCircleProgressComponent,
    NgTestSilderComponent,
    CircleProgressComponent,
    NgTestAnimateComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedAngularMaterialModule,
  ]
})
export class DashboardModule { }
