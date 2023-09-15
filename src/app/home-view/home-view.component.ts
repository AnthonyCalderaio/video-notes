import { Component } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {
  title = 'video-notes';

  savedVideos: any[] = [1,2,3]

  pageViewing = 'Home'
}
