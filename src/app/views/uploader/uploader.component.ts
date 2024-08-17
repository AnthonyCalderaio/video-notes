import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { StorageService } from '../../services/storage-service.service';
import { finalize } from 'rxjs';
import { LoadingNotificationService } from 'src/app/services/loading-notification/loading-notification.service';
import { UserData } from 'src/app/interfaces/user-data.interface';
import { environment, uploadModes } from 'src/environments/environment';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent {

  droppedVideoList: NgxFileDropEntry[] = [];
  userData!: UserData;
  loading = false;
  roomForVideos = true;

  byteLimit = 100000;
  fileLengthLimit = 5;

  pendingFiles: any[] = [];
  pendingFilesMetadata: any[] = [];
  totalPendingBytes = 0;


  constructor(
    private router: Router,
    private storageService: StorageService,
    private loader: LoadingNotificationService) { }

  ngOnInit(): void {
    this.isLoading(false)
    this.setUserData()
  }

  setUserData() {
    this.storageService.getUserData().subscribe(
      (userData: UserData) => {
        this.userData = userData;
      }
    )
  }

  // TODO: rewrite to audit global files
  auditPendingVideos() {

    if ((this.userData?.videoLengthUsed as any) < this.fileLengthLimit
      ||
      (this.userData?.videoStorageUsed as any) < this.byteLimit
    ) {
      // alert('no room!')
      this.roomForVideos = false;
    }
  }

  removeVideFromPending(index: number) {
    this.pendingFiles = this.pendingFiles.filter((file, fileIndex) => fileIndex != index);
    this.pendingFilesMetadata = this.pendingFilesMetadata.filter((file, fileIndex) => fileIndex != index);
    this.auditPendingVideos();
  }

  removeAllPending() {
    this.pendingFiles = [];
    this.pendingFilesMetadata = [];
    this.resetPendingVariables();
  }

  resetPendingVariables(){
    this.totalPendingBytes = 0;
  }

  // TODO: change type from any[]
  dropped(droppedFiles: any[]) {
    this.pendingFiles = [];
    this.pendingFiles = droppedFiles;
    droppedFiles.forEach(async file => {
      let analyzedFile = await this.analyzeFileData(file);
      this.pendingFilesMetadata.push(analyzedFile)
    })
    this.auditPendingVideos()
  }

  // TODO: use this to get file size and type
  analyzeFileData(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        let tempFile = {} as any;
        tempFile['type'] = this.massageFileType(file)
        tempFile['size'] = file.size;
        this.totalPendingBytes = this.totalPendingBytes + (tempFile['size'] | 0);
        resolve(tempFile)
      })
    })
  }

  massageFileType(file: any) {
    let fileType = file.type;
    if (!fileType) {
      fileType = file.name.split('.').pop();
    }
    if (!fileType) {
      fileType = 'Uknown'
    }
    return fileType;
  }

  savePendingFiles() {
    if (environment.uploadMode == uploadModes.pathed) {
      this.saveByPath();
    } else if (environment.uploadMode == uploadModes.saved) {
      this.saveToStorage();
      this.storageService.saveUserData(this.pendingFilesMetadata)
      // this.storageService.saveUploadedVideo(this.pendingFiles)
    }
  }

  saveByPath(){
    this.isLoading(true)
  }

  saveToStorage() {
    this.isLoading(true)
    this.storageService.saveUserData(this.pendingFilesMetadata)
    this.storageService.saveUploadedVideo(this.pendingFiles)
      .subscribe(res => {
        this.isLoading(false);
        this.pendingFiles.forEach((file, index) => { this.removeAllPending(); this.setUserData(); })
      })
  }

  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }
  //TODO: Fill in the below functions
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
