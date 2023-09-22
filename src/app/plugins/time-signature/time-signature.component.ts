import { Component, ViewChild } from '@angular/core';
import { VideoComponent } from 'src/app/views/video/video.component';
// import { TimebarDirective } from 'src/app/directives/timebar.directive';


@Component({
  selector: 'app-time-signature',
  templateUrl: './time-signature.component.html',
  styleUrls: ['./time-signature.component.css']
})
export class TimeSignatureComponent {
  constructor(public component:VideoComponent){}
  videoComponentRef: any
  assignedId = '';
  locationMetadata:any = {}
  ngOnInit(): void {
  }

}
