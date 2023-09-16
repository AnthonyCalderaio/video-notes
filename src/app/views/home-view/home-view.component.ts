import { Component } from '@angular/core';
import { StorageService } from '../../services/storage-service.service';
import { SavedVideo } from 'src/app/interfaces/saved-video.interface';
import { Router } from '@angular/router';
import { LoadingNotificationService } from 'src/app/services/loading-notification/loading-notification.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {

  locationRef = location;
  title = 'video-notes';
  savedVideos: SavedVideo[] = []
  pageViewing = 'Home'
  loading = false;

  constructor(
    public storageService: StorageService, 
    public router:Router,
    private loader: LoadingNotificationService) { }
  
  ngOnInit(): void {
    this.refreshVideoList()
  }

  refreshVideoList(){
    this.isLoading(true);
    this.storageService
      .getVideos()
      .subscribe((storedVideos) => {
        storedVideos ? this.savedVideos = storedVideos : [];
        this.isLoading(false);
      })
  }

  navigateToVideoScreen(videoIndex:any){
    let index = {index:videoIndex}
    this.router.navigate(['video'], {queryParams:index})
  }

  isLoading(loading:boolean){
    if(loading){
      this.loading = true;
      this.loader.show();
    }else{
      this.loading = false;
      this.loader.hide();
    }
}
}
