import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { Ch01HelloWorldComponent } from '../ch01-hello-world/ch01-hello-world.component';
import { Ch02SelBindComponent } from '../ch02-sel-bind/ch02-sel-bind.component';
import { Ch03UEEdataComponent } from '../ch03-ueedata/ch03-ueedata.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'ch01', pathMatch: 'full' },
      { path: 'ch01', component: Ch01HelloWorldComponent },
      { path: 'ch02', component: Ch02SelBindComponent },
      { path: 'ch03', component: Ch03UEEdataComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
