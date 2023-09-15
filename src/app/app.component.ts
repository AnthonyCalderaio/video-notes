import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'video-notes';

  savedVideos: any[] = [1,2,3]

  pageViewing = 'Home'

  constructor(private router: Router, private route: ActivatedRoute){}

  navigateToUploader(){
    this.router.navigate(['upload']);
  }
  
}
