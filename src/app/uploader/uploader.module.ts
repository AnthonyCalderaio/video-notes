import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from './uploader.component';
import { MatListModule } from '@angular/material/list';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [UploaderComponent],
  imports: [
    CommonModule,
    MatListModule,
    NgxFileDropModule,
  ],
  exports:[UploaderComponent],
  bootstrap:[UploaderComponent]
})
export class UploaderModule { }
