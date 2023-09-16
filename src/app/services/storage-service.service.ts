import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';
import { Observable, of, from, switchMap } from 'rxjs';
import { UtilityService } from './utility.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { SavedVideo } from '../interfaces/saved-video.interface';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private utilityService: UtilityService) { }

  saveVideos(videoList: NgxFileDropEntry[]): Observable<any[]> {
    return from(this.utilityService.extractVideoResources(videoList))
      .pipe(
        switchMap((extractedVideoArray: SavedVideo[]) => {
          return this.saveExtractedVideos(extractedVideoArray)
        })
      )
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

  getVideos(): Observable<any[]> {
    console.log('okay')
    return from(get('videos').then((saveVideos: any) => JSON.parse(saveVideos)));
  }

  clearAllVideos() {
    set('videos', '[]')
  }
}
