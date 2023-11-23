import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';
import { Observable, of, from, switchMap } from 'rxjs';
import { UtilityService } from './utility.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { SavedVideo } from '../interfaces/saved-video.interface';
import { TimeSignatureObject } from '../interfaces/time-signature-object.interface';
import { LoadingNotificationService } from './loading-notification/loading-notification.service';
import { UserData } from '../interfaces/user-data.interface';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private utilityService: UtilityService,
    private loadingService: LoadingNotificationService) {
    // set('userData',JSON.stringify({videoLengthUsed:0, videoStorageUsed:0}))
  }

  public getVideos(): Observable<any[]> {
    return from(get('videos').then((savedVideos: any) => {
      if (savedVideos) {
        return JSON.parse(savedVideos)
      }
      else {
        this.clearAllVideos();
      }
    }));
  }

  public getUserData() {
    return from(get('userData').then(userData => JSON.parse(userData)))
  }

  public clearAllVideos() {
    set('videos', '[]')
    set('userData', '{}')
  }

  private saveExtractedVideos(extractedVideoArray: SavedVideo[]): Observable<any> {
    // this.clearAllVideos()
    return from(get('videos')
      .then((savedVideos: any) => {
        // TODO: clean this up
        if (!savedVideos) {
          savedVideos = new Array()
        }
        try {
          savedVideos = JSON.parse(savedVideos)
        } catch (error) {

        }
        let tempList: SavedVideo[] = new Array()
        tempList = savedVideos.concat(extractedVideoArray)
        return set('videos', JSON.stringify(tempList))
          .then(() => {
            return tempList
          })
      }
      ))
  }

  saveNotesToVideoObject(index: number, notesArray: TimeSignatureObject[]) {
    this.loadingService.show('Saving');
    this.getVideos().subscribe(videos => {
      videos[index].notes = notesArray;
      this.updateVideoObject(videos).subscribe(() => {
        this.loadingService.hide();
      });
    })
  }

  private updateVideoObject(videos: any) {
    return from(set('videos', JSON.stringify(videos))
      .then(() => {
        // setting completed
        return of(videos)
      }))
  }

  saveUploadedVideo(videoList: NgxFileDropEntry[]): Observable<any[]> {
    return from(this.utilityService.extractVideoResources(videoList))
      .pipe(
        switchMap((extractedVideoArray: SavedVideo[]) => {
          return this.saveExtractedVideos(extractedVideoArray)
        })
      )
  }

  saveUserData(userFileSizes: any[]) {
    let memoryBytesToAdd = userFileSizes.reduce((accumulator, file) => accumulator + file.size, 0);
    this.getUserData().subscribe(
      (userData: UserData) => {
        set('userData', JSON.stringify({ videoLengthUsed: (userData.videoLengthUsed | 0) + (userFileSizes.length + 0), videoStorageUsed: (userData.videoStorageUsed | 0) + (memoryBytesToAdd | 0) }))
      }
    )
  }

}
