import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SimpleChartComponent } from '../charts/simple-chart/simple-chart.component';
import { SimpleBarComponent } from '../charts/simple-bar/simple-bar.component';
import { BasicLineComponent } from '../charts/line/basic-line/basic-line.component';
import { BasicAreaComponent } from '../charts/line/basic-area/basic-area.component';
import { SmoothedLineComponent } from '../charts/line/smoothed-line/smoothed-line.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'basicline', pathMatch: 'full' },
      { path: 'basicline', component: BasicLineComponent },
      { path: 'basicarea', component: BasicAreaComponent },
      { path: 'smoothedline', component: SmoothedLineComponent },

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
