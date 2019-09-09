import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddPostDialogComponent } from './dialog/add-post-dialog/add-post-dialog.component';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';
import { AddPostConfirmDialogComponent } from './dialog/add-post-confirm-dialog/add-post-confirm-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddPostDialogComponent,
    AddPostConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedAngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddPostDialogComponent, AddPostConfirmDialogComponent]
})
export class AppModule { }
