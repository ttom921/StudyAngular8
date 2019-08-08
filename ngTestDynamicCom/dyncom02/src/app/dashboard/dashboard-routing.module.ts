import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RouteAComponent } from '../route-a/route-a.component';
import { RouteBComponent } from '../route-b/route-b.component';
import { RouteCComponent } from '../route-c/route-c.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'routea', pathMatch: 'full' },
      { path: 'routea', component: RouteAComponent },
      { path: 'routeb', component: RouteBComponent },
      { path: 'routec', component: RouteCComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
