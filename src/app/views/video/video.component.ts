import { Component, OnInit, ViewChild, ViewContainerRef, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service.service';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { TimeSignatureObject } from 'src/app/interfaces/time-signature-object.interface';
import { interval, of, switchMap, takeWhile } from 'rxjs';
import { LoadingNotificationService } from 'src/app/services/loading-notification/loading-notification.service';
import { CentralService } from 'src/app/services/central.service';
import { environment, uploadModes } from '../../../environments/environment';


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
  // *legacy
  // savedVideoIndex!: number;
  savedVideoUrlIndex!: number
  initialNotesObject: TimeSignatureObject = {
    timeSignature: '0',
    notes: ''
  };
  notesArray: TimeSignatureObject[] = [];
  textArea = '';

  selectedSignatureObject: TimeSignatureObject = this.initialNotesObject;
  adjustTimeFloat = false;
  onKnownSignature = false;

  alive = true;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private loader: LoadingNotificationService,
    private centralService: CentralService) { }

  // All subscriptions: this.api.getDefaultMedia() 

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    this.setVideoSrc()
  }

  setVideoSrc() {
    if (environment.uploadMode == uploadModes.pathed) {
      this.populateSrcFromLocalPath();
    } else if (environment.uploadMode == uploadModes.saved) {
      // *legacy
      // this.populateSrcFromLocalStorage();
    }
  }

  populateSrcFromLocalPath() {
    this.route.queryParams.pipe(
      takeWhile(() => this.alive),
      switchMap(queryParams => {
        return this.storageService.getVideoPaths().pipe(
          switchMap(storedPaths => {
            this.src = `file://${storedPaths[queryParams['index']].path}`
            this.savedVideoUrlIndex = queryParams['index'];
            this.centralService.setTitle(storedPaths[queryParams['index']]?.path);
            if (storedPaths[this.savedVideoUrlIndex]?.notes) {
              this.notesArray = storedPaths[this.savedVideoUrlIndex].notes;
            }
            return of()
          })
        )
      })
    ).subscribe()


    // this.src = environment.defaultBasePath + `${encodeURI(someValue)}`
  }


  deleteButton() {
    this.deleteNoteHelper().then((_) => {
      this.loader.hide()
    })
  }

  async deleteNoteHelper() {
    this.loader.show()
    let timeSignatureNumberToRemove = this.selectedSignatureObject.timeSignature;
    if (this.notesArray.length > 0) {
      // If more object, pick the one next to it (behind)
      this.selectedSignatureObject = this.notesArray[Number(this.selectedSignatureObject.timeSignature) - 1]
    } else {
      // If no more saved signatures, set to original
      this.selectedSignatureObject = JSON.parse(JSON.stringify(this.initialNotesObject))
    }
    return new Promise((resolve, reject) => {
      this.notesArray = this.notesArray.filter((timeSignature, index) => {
        if (index + 1 == this.notesArray.length) {
          resolve(true);
        }
        if (timeSignature.timeSignature != timeSignatureNumberToRemove) {
          resolve(true);
          return true;
        } else {
          return false;
        }
      });
    })
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
      // this.selectedSignatureObject = JSON.parse(JSON.stringify({
      //   timeSignature: '-1',
      //   notes: ''
      // }));
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
    this.api.pause();
    let currentTime = this.formatSignature(this.api?.time?.current | 0);
    let foundSignatureObject: TimeSignatureObject;
    foundSignatureObject = this.setCurrentTimeSignature(currentTime)
    if (!foundSignatureObject) {
      this.selectedSignatureObject = {
        timeSignature: currentTime,
        notes: this.textArea
      } as TimeSignatureObject;
      this.notesArray.push(this.selectedSignatureObject);
      this.notesArray = this.sortNotesObject(this.notesArray);
    } else {
      this.selectedSignatureObject = foundSignatureObject;
    }
    this.onKnownSignature = true;
  }

  // *legacy
  // annotate() {
  //   this.api.pause();
  //   let currentTime = this.formatSignature(this.api?.time?.current | 0);
  //   let foundSignatureObject: TimeSignatureObject;
  //   foundSignatureObject = this.setCurrentTimeSignature(currentTime)
  //   if (!foundSignatureObject) {
  //     this.selectedSignatureObject = {
  //       timeSignature: currentTime,
  //       notes: this.textArea
  //     } as TimeSignatureObject;
  //     this.notesArray.push(this.selectedSignatureObject);
  //     this.notesArray = this.sortNotesObject(this.notesArray);
  //   } else {
  //     this.selectedSignatureObject = foundSignatureObject;
  //   }
  //   this.onKnownSignature = true;
  // }

  // TODO: Can we put this in annotate and condense it?
  foundTimeSignature(currentTime: any) {
    let foundSignatureObject: TimeSignatureObject;
    foundSignatureObject = this.setCurrentTimeSignature(currentTime)
    if (!foundSignatureObject) {
      return false;
    } else {
      return true;
    }
  }
  // TODO: Improve this function 
  handleUpdatedCurrentTime(time?: any) {
    let currentTime = this.formatSignature(this.api?.time?.current | 0);
    let foundSignatureObject = this.setCurrentTimeSignature(currentTime)
    if (foundSignatureObject) {
      this.onKnownSignature = true;
      this.selectedSignatureObject = foundSignatureObject;
    } else {
      this.onKnownSignature = false;
      this.selectedSignatureObject = {
        timeSignature: this.formatSignature(this.api.time.current),
        notes: ''
      };
    }
  }

  sortNotesObject(notesArray: any[]) {
    return notesArray.sort((a, b) => Number(a.timeSignature) < Number(b.timeSignature) ? -1 : Number(a.timeSignature) > Number(b.timeSignature) ? 1 : 0);
  }

  setCurrentTimeSignature(currentTime: any) {
    return this.notesArray.find((savedNotesSignatured: TimeSignatureObject) => {
      return String(currentTime) === savedNotesSignatured.timeSignature;
    }) as TimeSignatureObject;
  }

  // Legacy
  // saveAllNotes() {
  //   this.api.pause();
  //   this.storageService.saveNotesToVideoObject(this.savedVideoIndex, this.notesArray);
  // }

  saveAllNotes() {
    this.api.pause();
    this.storageService.saveNotesToVideoObject(this.savedVideoUrlIndex, this.notesArray);
  }

  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }

  fileLeave(idkYet: any) {

  }

  playOrPause() {
    if (this.api.state === 'paused') {
      this.api.play();
    }
    if (this.api.state === 'playing') {
      this.api.pause();
    }

  }

}
