import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploaderComponent } from './views/uploader/uploader.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[NgxFileDropModule]
})
export class AppModule { }
