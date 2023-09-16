import { Component } from '@angular/core';
import { StorageService } from '../../services/storage-service.service';
import { SavedVideo } from 'src/app/interfaces/saved-video.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
  locationRef = location;
  constructor(public storageService: StorageService, public router:Router) { }
  ngOnInit(): void {
    this.refreshVideoList()
  }
  title = 'video-notes';

  savedVideos: SavedVideo[] = []

  pageViewing = 'Home'

  refreshVideoList(){
    this.storageService
      .getVideos()
      .subscribe((storedVideos) => {
        storedVideos ? this.savedVideos = storedVideos : []
        console.log('storedVideos:')
        console.log(storedVideos)
      })
      // this.storageService.clearAllVideos()
  }

  navigateToVideoScreen(videoIndex:any){
    console.log(videoIndex)
    let index = {index:0}
    this.router.navigate(['video'], {queryParams:index})
  }
}
