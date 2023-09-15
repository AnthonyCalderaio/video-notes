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
    this.storageService
      .getVideos()
      .subscribe((storedVideos) => {
        storedVideos ? this.savedVideos = storedVideos : []
      })
      // this.storageService.clearAllVideos()
  }
  title = 'video-notes';

  savedVideos: SavedVideo[] = []

  pageViewing = 'Home'

  navigateToVideoScreen(path:string){
    this.router.navigate(['video'])
    console.log('navigate to:'+path)
  }
}
