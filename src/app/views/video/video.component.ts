import { Component, Input, OnInit, ViewChild, AfterViewChecked, AfterContentChecked, HostListener, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service.service';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { TimeSignatureComponent } from 'src/app/plugins/time-signature/time-signature.component';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrubBar') scrubBar: any;

  @ViewChild('noteBar', { read: ViewContainerRef }) vcRef!: ViewContainerRef;
  viewRef!: ViewContainerRef;

  src: any = undefined;
  api!: VgApiService;


  // All notes for page
  notesArray: any[] = []

  selectedSignatureObject: any = {};

  constructor(private route: ActivatedRoute, private storageService: StorageService) { }

  // All subscriptions: this.api.getDefaultMedia() 

  handleDrag() {
    console.log('this.api.getDefaultMedia().subscriptions:')
    console.log(this.api.getDefaultMedia().subscriptions)
    this.api.getDefaultMedia().subscriptions.seeking.subscribe((res: Event) => {
      console.log('seeking:')
      console.log(res)
    })
  }

  seekTo(input: any) {
    let signature = Number(input);
    this.api.seekTime(signature)
  }

  printSignature() {
    console.log(this.selectedSignatureObject)
  }

  printAllNotes() {
    console.log(this.notesArray)
  }

  formatSignature(signature: any) {
    return String(Math.floor(signature / 1000))
  }

  setDomElement(){
      //   const viewContainerRef = this.vcRef;
  //   const component = viewContainerRef.createComponent(TimeSignatureComponent);
  //   component.instance.videoComponentRef = this;
  //   component.instance.assignedId = locationMetadata.currentSecond;
  //   component.instance.locationMetadata = locationMetadata;
  }



/* 
  getScrubBar() {
    // Get dimensions
    let barWidth = this.scrubBar.elem.clientWidth;
    console.log('barWidth', barWidth)
    let duration = this.api.duration;
    console.log('duration:', duration)
    let pixelsPerSecond = barWidth / duration;
    console.log('pixelsPerSecond:', pixelsPerSecond)

    let slider = this.api.videogularElement.getElementsByClassName("slider")[0]
    let sliderLocation = slider.getBoundingClientRect();

    // Set to html
    return sliderLocation
  }
*/

  annotate() {
    let currentTime = this.formatSignature(this.api.time.current);
    let foundSignatureObject;
    foundSignatureObject = this.notesArray.find((savedNotesSignatured) => {
      return String(currentTime) === savedNotesSignatured.timeSignature;
    })
    if (!foundSignatureObject) {
      this.selectedSignatureObject = {
        timeSignature: currentTime,
        notes: ''
      };
      this.notesArray.push(this.selectedSignatureObject);
    } else {
      this.selectedSignatureObject = foundSignatureObject;
    }
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(queryParams => {
        this.storageService
          .getVideos()
          .subscribe((storedVideos) => {
            this.src = storedVideos[queryParams['index']].base64;
          })
      }
      )

  }
  ngAfterViewChecked(): void {
    // this.api.videogularElement.
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        this.api.getDefaultMedia().currentTime = 0;

      }
    );
  }

  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }

  fileLeave(idkYet: any) {

  }
}
