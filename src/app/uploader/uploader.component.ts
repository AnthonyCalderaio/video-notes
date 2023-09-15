import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {

  constructor(private router:Router){}

  droppedVideoList: NgxFileDropEntry[] = [];

  dropped(droppedFiles: NgxFileDropEntry[]){
    this.droppedVideoList = this.droppedVideoList.concat(droppedFiles)
    console.log(droppedFiles)
  }

  //TODO: Fill in the below functions
  fileOver(idkYet: any){

  }

  fileLeave(idkYet: any){

  }

  navigateHome(){
    this.router.navigate(['/home']);
  }

}
