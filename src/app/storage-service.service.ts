import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';
import { Observable, of, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveVideos(videoList: []): Observable<any[]> {
    console.log('got:')
    console.log(videoList)
    from(
      get('videos')
        .then(savedVideos => {
          savedVideos = savedVideos ? JSON.parse(savedVideos) : savedVideos
          console.log('already saved:')
          console.log(savedVideos)
          let tempList = JSON.stringify(savedVideos ? [...savedVideos, ...videoList] : [])
          console.log('Now saving:')
          console.log(tempList)
          set('videos', tempList )
            .then(result => {
              console.log('set them!');
              console.log(tempList)
              return result
            })
        }
        )
    );
    return of()
  }

  getVideos(): Observable<any[]> {
    return from(get('videos').then((saveVideos:any) => JSON.parse(saveVideos)));
  }

  clearAllVideos(){
    set('videos', JSON.stringify([]) )
  }
}
