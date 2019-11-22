import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { CarEventListComponent } from './page/pagelist/car-event-list/car-event-list.component';
import { SimpleBarComponent } from './page/pagecharts/Bar/simple-bar/simple-bar.component';
import { DriverBarComponent } from './page/pagecharts/Bar/driver-bar/driver-bar.component';
import { LineFuelconsumptionComponent } from './page/pagecharts/Line/line-fuelconsumption/line-fuelconsumption.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'careventlist', pathMatch: 'full' },
      { path: 'testshowpage', component: TestShowPageComponent, },
      { path: 'careventlist', component: CarEventListComponent },
      { path: 'simplebar', component: SimpleBarComponent },
      { path: 'driverbar', component: DriverBarComponent },
      { path: 'linefuelconsumption', component: LineFuelconsumptionComponent },
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
