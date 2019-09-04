import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailListComponent } from './email-list/email-list.component';


const routes: Routes = [
  { path: '', component: EmailListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
