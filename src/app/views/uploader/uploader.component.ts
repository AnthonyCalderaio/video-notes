import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { StorageService } from '../../services/storage-service.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {

  constructor(private router: Router, private storageService: StorageService) { }

  droppedVideoList: NgxFileDropEntry[] = [];

  loading = false;

  dropped(droppedFiles: NgxFileDropEntry[]) {
    this.loading = true;
    this.storageService.saveVideos(droppedFiles)
      .pipe(finalize(()=>this.loading = false))
      .subscribe( )

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
