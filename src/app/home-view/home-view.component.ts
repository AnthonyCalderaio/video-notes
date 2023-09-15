import { Component } from '@angular/core';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
  constructor(private storageService: StorageServiceService) { }
  ngOnInit(): void {
    this.storageService
      .getVideos()
      .subscribe((storedVideos) => {
        console.log('got:');
        console.log(storedVideos)
        storedVideos ? this.savedVideos = storedVideos : []
      })

  }
  title = 'video-notes';

  savedVideos: any[] = []

  pageViewing = 'Home'
}
