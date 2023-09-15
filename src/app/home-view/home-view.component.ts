import { Component } from '@angular/core';
import { StorageService } from '../storage-service.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
  constructor(private storageService: StorageService) { }
  ngOnInit(): void {
    this.storageService
      .getVideos()
      .subscribe((storedVideos) => {
        console.log('got:');
        console.log(storedVideos)
        storedVideos ? this.savedVideos = storedVideos : []
      })
      // this.storageService.clearAllVideos()
  }
  title = 'video-notes';

  savedVideos: any[] = []

  pageViewing = 'Home'
}
