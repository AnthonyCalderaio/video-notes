import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { StorageService } from '../../services/storage-service.service';
import { finalize } from 'rxjs';
import { LoadingNotificationService } from 'src/app/services/loading-notification/loading-notification.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {

  droppedVideoList: NgxFileDropEntry[] = [];
  loading = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private loader: LoadingNotificationService) { }

  ngOnInit(): void {

  }

  dropped(droppedFiles: NgxFileDropEntry[]) {
    this.isLoading(true)
    this.storageService.saveUploadedVideo(droppedFiles)
      .subscribe(res => { this.isLoading(false) })

  }

  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }

  fileLeave(idkYet: any) {

  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  isLoading(loading: boolean) {
    if (loading) {
      this.loading = true;
      this.loader.show();
    } else {
      this.loading = false;
      this.loader.hide();
    }
  }
}
