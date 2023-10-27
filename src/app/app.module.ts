import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploaderComponent } from './views/uploader/uploader.component';
import { VideoComponent } from './views/video/video.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { SpinnerComponent } from './services/loading-notification/spinner/spinner.component';
import { TimeSignatureComponent } from './plugins/time-signature/time-signature.component';
import { TextAreaComponent } from './plugins/text-area/text-area.component';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { MinutesFormatPipe } from './pipes/minutes-format.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeveloperToolsComponent } from './views/developer-tools/developer-tools.component'; // <-- import the module


@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    UploaderComponent,
    VideoComponent,
    SpinnerComponent,
    TimeSignatureComponent,
    TextAreaComponent,
    MinutesFormatPipe,
    DeveloperToolsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxFileDropModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    TextFieldModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NgxFileDropModule]
})
export class AppModule { }
