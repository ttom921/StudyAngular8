import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';
import { VideoPlayManagerComponent } from './video-play-manager/video-play-manager.component';
import { MatVideoModule } from './_common/video/video.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { GpsInfoComponent } from './_common/gps-info/gps-info.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayManagerComponent,
    GpsInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedAngularMaterialModule,
    MatVideoModule,
    NgxEchartsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
