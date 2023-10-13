import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service.service';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { TimeSignatureObject } from 'src/app/interfaces/time-signature-object.interface';
import { interval, take } from 'rxjs';
import { LoadingNotificationService } from 'src/app/services/loading-notification/loading-notification.service';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('scrubBar') scrubBar: any;

  @ViewChild('noteBar', { read: ViewContainerRef }) vcRef!: ViewContainerRef;
  viewRef!: ViewContainerRef;

  src: any = undefined;
  api!: VgApiService;

  savedVideoIndex!: number;

  initialNotesObject: TimeSignatureObject = {
    timeSignature: '0',
    notes: ''
  };

  notesArray: TimeSignatureObject[] = [this.initialNotesObject];

  selectedSignatureObject: TimeSignatureObject = this.initialNotesObject;
  adjustTimeFloat = false;
  onKnownSignature = false;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private loader: LoadingNotificationService,
    private centralService: CentralService) { }

  // All subscriptions: this.api.getDefaultMedia() 

  ngOnInit(): void {
    // Set Video src
    this.route.queryParams
      .subscribe(queryParams => {
        this.storageService
          .getVideos()
          .subscribe((storedVideos) => {
            this.src = storedVideos[queryParams['index']].base64;
            this.savedVideoIndex = queryParams['index'];
          })
      });
    // Get notes metadata
    this.storageService.getVideos()
      .pipe(take(1))
      .subscribe(
        retreivedVideos => {
          this.centralService.currentVideoTitle = retreivedVideos[this.savedVideoIndex]?.name;
          if (retreivedVideos[this.savedVideoIndex]?.notes) {
            this.notesArray = retreivedVideos[this.savedVideoIndex].notes;
          }
        });

    // TODO: make this more efficient.
    this.loader.show()
    let checkPlayerIsReady = interval(1000).subscribe(playerReady => {
      if (playerReady) {
        checkPlayerIsReady.unsubscribe()
        this.handleDrag();
        this.loader.hide()
      }
    })
  }

  deleteOneNote(){
    
  }


  handleDrag() {
    this.api.getDefaultMedia().subscriptions.seeking.subscribe((res: Event) => {

      this.adjustTimeAndPreventLoop()
    })
  }

  adjustTimeAndPreventLoop() {
    if (this.adjustTimeFloat) {
      this.seekTo(Number(this.formatSignature(this.api.time.current)))
      this.adjustTimeFloat = false;
    } else {
      this.adjustTimeFloat = true;
    }
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

  selectSignature(signatureObject: any) {
    this.selectedSignatureObject = signatureObject as TimeSignatureObject;
    this.seekTo(this.selectedSignatureObject?.timeSignature)
  }

  seekTo(input: any) {
    let signature = Number(input);
    this.api.seekTime(signature)
    this.adjustTimeFloat = false;
    let foundSignatureObject: TimeSignatureObject;
    foundSignatureObject = this.setCurrentTimeSignature(signature);
    if (foundSignatureObject) {
      this.selectedSignatureObject = foundSignatureObject;
      this.onKnownSignature = true;
    } else {
      this.selectedSignatureObject = JSON.parse(JSON.stringify({
        timeSignature: '-1',
        notes: ''
      }));
      this.onKnownSignature = false;
    }
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

  setDomElement() {
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
    let foundSignatureObject: TimeSignatureObject;
    foundSignatureObject = this.setCurrentTimeSignature(currentTime)
    if (!foundSignatureObject) {
      this.selectedSignatureObject = {
        timeSignature: currentTime,
        notes: ''
      } as TimeSignatureObject;
      this.notesArray.push(this.selectedSignatureObject);
      this.notesArray = this.sortNotesObject(this.notesArray);
    } else {
      this.selectedSignatureObject = foundSignatureObject;
      this.onKnownSignature = true;
    }
    // this.seekTo(this.selectedSignatureObject?.timeSignature)
  }

  sortNotesObject(notesArray: any[]) {
    return notesArray.sort((a, b) => Number(a.timeSignature) < Number(b.timeSignature) ? -1 : Number(a.timeSignature) > Number(b.timeSignature) ? 1 : 0);
  }

  setCurrentTimeSignature(currentTime: any) {
    return this.notesArray.find((savedNotesSignatured: TimeSignatureObject) => {
      return String(currentTime) === savedNotesSignatured.timeSignature;
    }) as TimeSignatureObject;
  }

  saveAllNotes() {
    this.storageService.saveNotesToVideoObject(this.savedVideoIndex, this.notesArray);
  }

  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }

  fileLeave(idkYet: any) {

  }



}
