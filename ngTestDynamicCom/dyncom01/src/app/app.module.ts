import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { FigA1Component } from './feature/fig-a1/fig-a1.component';
import { FigB1Component } from './feature/fig-b1/fig-b1.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    FigA1Component,
    FigB1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [HelloComponent, FigA1Component, FigB1Component],
  exports: [HelloComponent, FigA1Component, FigB1Component]
})
export class AppModule { }
