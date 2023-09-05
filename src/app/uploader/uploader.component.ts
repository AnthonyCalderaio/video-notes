import { Component } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent {

  droppedVideoList: NgxFileDropEntry[] = [];

  dropped(droppedFiles: NgxFileDropEntry[]){
    this.droppedVideoList = this.droppedVideoList.concat(droppedFiles)
    console.log(droppedFiles)
  }

  //TODO: Fill in the below functions

  // TODO: change name
  fileOver(idkYet: any){

  }
  // TODO: change name
  fileLeave(idkYet: any){

  }

}
