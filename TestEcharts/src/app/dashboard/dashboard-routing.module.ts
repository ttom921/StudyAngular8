import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SimpleChartComponent } from '../charts/simple-chart/simple-chart.component';
import { SimpleBarComponent } from '../charts/simple-bar/simple-bar.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'simplechart', pathMatch: 'full' },
      { path: 'simplechart', component: SimpleChartComponent },
      { path: 'simplebarchart', component: SimpleBarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
