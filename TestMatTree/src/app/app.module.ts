import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';
import { TreeFlatOverviewExampleComponent } from './tree-flat-overview-example/tree-flat-overview-example.component';
import { TreeNestedOverviewExampleComponent } from './tree-nested-overview-example/tree-nested-overview-example.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeFlatOverviewExampleComponent,
    TreeNestedOverviewExampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedAngularMaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
