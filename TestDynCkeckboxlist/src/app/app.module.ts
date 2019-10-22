import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';
import { TestDymcklistComponent } from './test-dymcklist/test-dymcklist.component';
import { TestDymcklistasyncComponent } from './test-dymcklistasync/test-dymcklistasync.component';
import { TestDyncklistinputComponent } from './test-dyncklistinput/test-dyncklistinput.component';

@NgModule({
  declarations: [
    AppComponent,
    TestDymcklistComponent,
    TestDymcklistasyncComponent,
    TestDyncklistinputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedAngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
