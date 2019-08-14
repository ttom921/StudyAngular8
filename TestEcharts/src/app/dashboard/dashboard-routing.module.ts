import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SimpleChartComponent } from '../charts/simple-chart/simple-chart.component';
import { SimpleBarComponent } from '../charts/simple-bar/simple-bar.component';
import { BasicLineComponent } from '../charts/line/basic-line/basic-line.component';
import { BasicAreaComponent } from '../charts/line/basic-area/basic-area.component';
import { SmoothedLineComponent } from '../charts/line/smoothed-line/smoothed-line.component';
import { StackedLineComponent } from '../charts/line/stacked-line/stacked-line.component';
import { BarAniDelayComponent } from '../charts/bar/bar-ani-delay/bar-ani-delay.component';
import { MixLineBarComponent } from '../charts/bar/mix-line-bar/mix-line-bar.component';
import { SimplePieComponent } from '../charts/pie/simple-pie/simple-pie.component';
import { RosePieComponent } from '../charts/pie/rose-pie/rose-pie.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'basicline', pathMatch: 'full' },
      //line圖
      { path: 'basicline', component: BasicLineComponent },
      { path: 'basicarea', component: BasicAreaComponent },
      { path: 'smoothedline', component: SmoothedLineComponent },
      { path: 'stackedline', component: StackedLineComponent },
      //bar圖
      { path: 'baranideley', component: BarAniDelayComponent },
      { path: 'mixlinebar', component: MixLineBarComponent },
      //pie圖
      { path: 'simplepie', component: SimplePieComponent },
      { path: 'rosepie', component: RosePieComponent },
      //
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
