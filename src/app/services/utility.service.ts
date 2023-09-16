import { Injectable } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Observable, of } from 'rxjs';
import { SavedVideo } from '../interfaces/saved-video.interface';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  async extractVideoResources(videoList: any):Promise<any> {
    let extractedVideoArray = Promise.all( videoList.map(async (video: any, index: number) => {
      let replacementVideo = {} as SavedVideo;
      replacementVideo['name'] = video.fileEntry.name;
      replacementVideo['videoPath'] = video.fileEntry.fullPath;
      // replacementVideo['id'] = Math.floor(Math.random() * 110000);
      replacementVideo['base64'] = await this.getBase64FromFile(video);
      return replacementVideo;
    }))
    return  await extractedVideoArray
  }

  async getBase64FromFile(file: any):Promise<any> {
    return new Promise((resolve, reject) => {
      
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      const reader = new FileReader();

    return fileEntry.file(file => {
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log('done')
          console.log(reader.result)
          resolve(reader.result)
        };
    });
      
  })
  }
}
