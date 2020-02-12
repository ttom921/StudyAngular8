import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';
import { VideoPlayManagerComponent } from './video-play-manager/video-play-manager.component';
import { MatVideoComponent } from './_common/video/mat-video.component';
import { SecondsToTimePipe } from './_common/video/pipes/seconds-to-time.pipe';
import { MatSliderProgressBarComponent } from './_common/video/internal/mat-slider-progress-bar/mat-slider-progress-bar.component';
import { MatPlayButtonComponent } from './_common/video/ui/mat-play-button/mat-play-button.component';
import { MatVolumeControlComponent } from './_common/video/ui/mat-volume-control/mat-volume-control.component';
import { MatDownloadButtonComponent } from './_common/video/ui/mat-download-button/mat-download-button.component';
import { MatFullscreenButtonComponent } from './_common/video/ui/mat-fullscreen-button/mat-fullscreen-button.component';
import { MatTimeControlComponent } from './_common/video/ui/mat-time-control/mat-time-control.component';
import { MatQualityControlComponent } from './_common/video/ui/mat-quality-control/mat-quality-control.component';
import { MatVideoSpinnerComponent } from './_common/video/ui/mat-video-spinner/mat-video-spinner.component';
import { MatSeekProgressControlComponent } from './_common/video/ui/mat-seek-progress-control/mat-seek-progress-control.component';
import { MatVideoSourceDirective } from './_common/video/directives/mat-video-source.directive';
import { MatVideoTrackDirective } from './_common/video/directives/mat-video-track.directive';
import { MatFrameByFrameControlComponent } from './_common/video/ui/mat-frame-by-frame-control/mat-frame-by-frame-control.component';
import { FullscreenService } from './_common/video/services/fullscreen.service';
import { EventService } from './_common/video/services/event.service';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayManagerComponent,

    SecondsToTimePipe,
    MatVideoComponent,
    MatSliderProgressBarComponent,
    MatPlayButtonComponent,
    MatVolumeControlComponent,
    MatDownloadButtonComponent,
    MatFullscreenButtonComponent,
    MatTimeControlComponent,
    MatQualityControlComponent,
    MatVideoSpinnerComponent,
    MatSeekProgressControlComponent,
    MatVideoSourceDirective,
    MatVideoTrackDirective,
    MatFrameByFrameControlComponent,

    MatVideoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    SharedAngularMaterialModule,
  ],
  providers: [
    FullscreenService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
