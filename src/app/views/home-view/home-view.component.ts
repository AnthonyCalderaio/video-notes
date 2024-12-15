import { Component } from '@angular/core';
import { StorageService } from '../../services/storage-service.service';
import { Router } from '@angular/router';
import { LoadingNotificationService } from 'src/app/services/loading-notification/loading-notification.service';
import { Observable } from 'rxjs';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {

  locationRef = location;
  title = 'video-notes';

  // *legacy
  // savedVideos: SavedVideo[] = []

  storedPaths: any
  pageViewing = 'Home'
  loading = false;
  devMode = true;
  showDialog = false;

  constructor(
    public storageService: StorageService,
    public router: Router,
    private loader: LoadingNotificationService,
    public centralService: CentralService) { }

  ngOnInit(): void {
    // *Legacy
    // this.refreshVideoList()

    this.refreshVideoPathList().subscribe((storedPaths) => {
      console.log('storedPaths:', storedPaths)
      storedPaths ? this.storedPaths = storedPaths : this.storageService.clearAllVideoPaths();
      this.isLoading(false);
    })
  }

  refreshVideoPathList(): Observable<any> {
    this.isLoading(true);
    return this.storageService.getSavedPaths()
  }

  // *Legacy
  // refreshVideoList() {
  //   this.isLoading(true);
  //   this.storageService
  //     .getVideos()
  //     .subscribe((storedVideos) => {
  //       storedVideos ? this.savedVideos = storedVideos : [];
  //       this.isLoading(false);
  //     })
  // }

  // *Legacy
  // navigateToVideoScreen(videoIndex: any) {
  //   let index = { index: videoIndex }
  //   this.router.navigate(['video'], { queryParams: index })
  // }

  nagivateToUrlScreen(videoUrlIndex: any) {
    let index = { index: videoUrlIndex }
    this.router.navigate(['video'], { queryParams: index })
  }

  navigateToDevTools() {
    this.router.navigate(['developer-tools']);
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

  deleteVideoPath(index: number) {
    this.storageService.deleteVideoPathAtIndex(index).subscribe(res => {
      this.refreshVideoPathList();
    })
  }

  // TODO: unlock the feature
  unlockPremiumFeatures() {

  }

}
