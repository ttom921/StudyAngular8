import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Ch01HelloWorldComponent } from '../ch01-hello-world/ch01-hello-world.component';
import { Ch02SelBindComponent } from '../ch02-sel-bind/ch02-sel-bind.component';
import { Ch03UEEdataComponent } from '../ch03-ueedata/ch03-ueedata.component';
import { Ch04ElmsidComponent } from '../ch04-elmsid/ch04-elmsid.component';
import { Ch05SimplebarComponent } from '../ch05-simplebar/ch05-simplebar.component';
import { Ch06ScaleComponent } from '../ch06-scale/ch06-scale.component';
import { Ch07AxisComponent } from '../ch07-axis/ch07-axis.component';
import { Ch08BarChartComponent } from '../ch08-bar-chart/ch08-bar-chart.component';
import { Ch09BarcharAniComponent } from '../ch09-barchar-ani/ch09-barchar-ani.component';
import { Ch10InteractiveComponent } from '../ch10-interactive/ch10-interactive.component';
import { Ch11PieChartComponent } from '../ch11-pie-chart/ch11-pie-chart.component';
import { Ch12ForceDirectedGraphComponent } from '../ch12-force-directed-graph/ch12-force-directed-graph.component';
import { Ch13TreeGraphComponent } from '../ch13-tree-graph/ch13-tree-graph.component';
import { Ch14TopoJSONComponent } from '../ch14-topo-json/ch14-topo-json.component';
import { Ch15TaiwanTopoJsonComponent } from '../ch15-taiwan-topo-json/ch15-taiwan-topo-json.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'ch01', pathMatch: 'full' },
      { path: 'ch01', component: Ch01HelloWorldComponent },
      { path: 'ch02', component: Ch02SelBindComponent },
      { path: 'ch03', component: Ch03UEEdataComponent },
      { path: 'ch04', component: Ch04ElmsidComponent },
      { path: 'ch05', component: Ch05SimplebarComponent },
      { path: 'ch06', component: Ch06ScaleComponent },
      { path: 'ch07', component: Ch07AxisComponent },
      { path: 'ch08', component: Ch08BarChartComponent },
      { path: 'ch09', component: Ch09BarcharAniComponent },
      { path: 'ch10', component: Ch10InteractiveComponent },
      { path: 'ch11', component: Ch11PieChartComponent },
      { path: 'ch12', component: Ch12ForceDirectedGraphComponent },
      { path: 'ch13', component: Ch13TreeGraphComponent },
      { path: 'ch14', component: Ch14TopoJSONComponent },
      { path: 'ch15', component: Ch15TaiwanTopoJsonComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
