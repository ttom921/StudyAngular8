import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TestShowPageComponent } from './page/test-show-page/test-show-page.component';
import { CarEventListComponent } from './page/pagelist/car-event-list/car-event-list.component';
import { SimpleBarComponent } from './page/pagecharts/Bar/simple-bar/simple-bar.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'testshowpage', pathMatch: 'full' },
      { path: 'testshowpage', component: TestShowPageComponent, },
      { path: 'careventlist', component: CarEventListComponent },
      { path: 'simplebar', component: SimpleBarComponent },
    ]
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
