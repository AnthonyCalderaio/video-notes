import { Component } from '@angular/core';
import { VideoComponent } from 'src/app/views/video/video.component';


@Component({
  selector: 'app-time-signature',
  templateUrl: './time-signature.component.html',
  styleUrls: ['./time-signature.component.css']
})
export class TimeSignatureComponent {
  constructor(public component: VideoComponent) { }
  videoComponentRef: any
  assignedId = '';
  locationMetadata: any = {}
  ngOnInit(): void {
  }

}
