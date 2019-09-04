import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailListComponent } from './email-list/email-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    EmailListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedAngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
