import { Injectable } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Observable, of } from 'rxjs';
import { SavedVideo } from '../interfaces/saved-video.interface';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  extractVideoResources(videoList: any):Observable<SavedVideo[]>{
    let extractedVideoArray = videoList.map((video: any) => {
      let replacementVideo = {} as SavedVideo;
      replacementVideo['name'] = video.fileEntry.name;
      replacementVideo['videoPath'] = video.fileEntry.fullPath;//video.fileEntry['filesystem']['fullPath']
      return replacementVideo;
    })
    return of(extractedVideoArray)
  }
}
