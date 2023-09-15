import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { StorageService } from '../../services/storage-service.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {

  constructor(private router: Router, private storageService: StorageService) { }

  droppedVideoList: NgxFileDropEntry[] = [];

  dropped(droppedFiles: NgxFileDropEntry[]) {
    this.storageService.saveVideos(droppedFiles)
      .subscribe()

  }

  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }

  fileLeave(idkYet: any) {

  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

}
