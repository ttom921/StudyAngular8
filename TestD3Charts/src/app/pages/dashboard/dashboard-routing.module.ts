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
      { path: 'ch07', component: Ch07AxisComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
