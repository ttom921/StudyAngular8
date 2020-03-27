import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AngularProgressBarsComponent } from '../angular-progress-bars/angular-progress-bars.component';
import { NgCircleProgressComponent } from '../ng-circle-progress/ng-circle-progress.component';
import { NgTestSilderComponent } from '../ng-test-silder/ng-test-silder.component';
import { NgTestAnimateComponent } from '../ng-test-animate/ng-test-animate.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'ngcircleprogress', pathMatch: 'full' },
      { path: 'angularprogressbars', component: AngularProgressBarsComponent },
      { path: 'ngcircleprogress', component: NgCircleProgressComponent },
      { path: 'ngtestsilder', component: NgTestSilderComponent },
      { path: 'ngtestanimate', component: NgTestAnimateComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
