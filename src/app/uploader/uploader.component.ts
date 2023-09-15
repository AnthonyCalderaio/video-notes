import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { StorageService } from '../storage-service.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {

  constructor(private router:Router, private storageService: StorageService){}

  droppedVideoList: NgxFileDropEntry[] = [];

  dropped(droppedFiles: NgxFileDropEntry[]){
    this.droppedVideoList = this.droppedVideoList.concat(droppedFiles)
    this.storageService.saveVideos(droppedFiles as any)
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
