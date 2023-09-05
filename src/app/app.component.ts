import { Component } from '@angular/core';
import { ScreenViews } from './interfaces/screen-views'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-notes';

  savedVideos: any[] = [1,2,3]

  pageViewing = 'Home'
  
}
