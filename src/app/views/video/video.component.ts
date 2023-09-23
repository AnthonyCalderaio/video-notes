import { Component, Input, OnInit, ViewChild, AfterViewChecked, AfterContentChecked, HostListener, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service.service';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { TimeSignatureObject } from 'src/app/interfaces/time-signature-object.interface';
import { interval } from 'rxjs';
import { LoadingNotificationService } from 'src/app/services/loading-notification/loading-notification.service';

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

  notesArray: TimeSignatureObject[] = []

  selectedSignatureObject!: TimeSignatureObject;
  adjustTimeFloat = false;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private loader: LoadingNotificationService) { }

  // All subscriptions: this.api.getDefaultMedia() 

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


  handleDrag() {
    this.api.getDefaultMedia().subscriptions.seeking.subscribe((res: Event) => {

      this.adjustTimeAndPReventLoop()
    })
  }

  adjustTimeAndPReventLoop(){
    if(this.adjustTimeFloat){
      this.seekTo(Number(this.formatSignature(this.api.time.current)))
      this.adjustTimeFloat = false;
    }else{
      this.adjustTimeFloat = true
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
    }else{
      this.selectedSignatureObject = new Object() as any;
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
    } else {
      this.selectedSignatureObject = foundSignatureObject;
    }
    this.seekTo(this.selectedSignatureObject?.timeSignature)
  }

  setCurrentTimeSignature(currentTime: any){
    return this.notesArray.find((savedNotesSignatured: TimeSignatureObject) => {
      return String(currentTime) === savedNotesSignatured.timeSignature;
    }) as TimeSignatureObject;
  }


  ngAfterViewChecked(): void {
    // this.api.videogularElement.
  }



  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }

  fileLeave(idkYet: any) {

  }


  // customHandleSeek(seekThis?: any): Observable<any> {
  //   // return this.api.currentTime = Number(this.formatSignature(this.api.time.current));
  //   console.log('haltLoop')
  //   console.log(this.haltLoop)
  //   return this.api.getDefaultMedia().subscriptions.seeked
  //   .pipe(
  //     switchMap(res => {
  //       if(this.haltLoop){
  //         console.log('res1')
  //         return of(this.api.seekTime(Number(this.formatSignature(this.api.time.current))))
  //         // return of(res)
  //       }else{
  //         console.log('res2')
  //         return of(res)
  //       }
  //       // console.log('res')
  //       // console.log(res)
  //       // return of(res)
  //     })
  //   );
  // }
}
