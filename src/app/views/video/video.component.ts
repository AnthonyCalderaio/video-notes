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

  playerRatios = {
    barWidth: undefined,
    duration: undefined,
    pixelsPerSecond: undefined,
    sliderLocation: undefined
  } as any

  // All notes for page
  notesObject: any = {}

  selectedSignature:any = {};;

  constructor(private route: ActivatedRoute, private storageService: StorageService) { }

  // All subscriptions: this.api.getDefaultMedia() 

  handleDrag(){
    console.log(this.api.getDefaultMedia().track)
    // this.api.getDefaultMedia().subscriptions.ended.subscribe()
    // console.log(this.scrubBar)
    // this.api.getDefaultMedia().subscriptions.seeking.subscribe(res => {
    //   console.log(res)
    // })
  }

  seekTo(input: any){
    // console.log(timeSignature)
    let signature = Number(input.currentSecond);
    this.api.seekTime(signature)
    this.setSelectedSignature(signature)
  }

  setSelectedSignature(signature:number): object{
    this.selectedSignature = this.notesObject[signature]
    return this.selectedSignature;
  }

  printSignature(){
    console.log(this.selectedSignature)
  }

  printAllNotes(){
    console.log(this.notesObject)
  }

  addTime() {
    let currentTime = this.api.time.current;
    console.log(currentTime)
    let currentSecond = String(Math.floor(currentTime / 1000));
    console.log(currentSecond)
    // this.notesObject[currentSecond] = 'some note'
    console.log(this.notesObject)
  }

  addTimeSignatureToDom(locationMetadata: any) {
    console.log('locationMetadata:' + locationMetadata)
    const viewContainerRef = this.vcRef;
    const component = viewContainerRef.createComponent(TimeSignatureComponent);
    component.instance.videoComponentRef = this;
    component.instance.assignedId = locationMetadata.currentSecond;
    component.instance.locationMetadata = locationMetadata;
    this.notesObject[locationMetadata.currentSecond] = {
      locationMetadata:locationMetadata,
      note:' '
    }
    console.log('notesObject:')
    console.log(this.notesObject)
    this.setSelectedSignature(locationMetadata.currentSecond)
    // this.selectedSignature = this.notesObject[locationMetadata.currentSecond];
  }

  timeSignatureStyles(locationMetadata?: any) {
    // console.log(locationMetadata);
    // console.log(Number(locationMetadata.currentSecond))
    return {
      'position': 'absolute',
      'left': Number(locationMetadata.currentSecond) * locationMetadata.pixelsPerSecond + 7 + 'px',
      'top': this.playerRatios.sliderLocation.y + 25 + 'px',
      'color': 'red'
    }
  }

  getScrubBar() {
    // Get time codes
    let currentTime = this.api.time.current;
    console.log(currentTime)
    let currentSecond = String(currentTime / 1000);
    console.log(currentSecond)
    // this.notesObject[currentSecond] = 'some note'
    console.log(this.notesObject)
    // this.notesObject[currentSecond] = 'notes';

    // Get dimensions
    let barWidth = this.scrubBar.elem.clientWidth;
    console.log('barWidth', barWidth)
    let duration = this.api.duration;
    console.log('duration:', duration)
    let pixelsPerSecond = barWidth / duration;
    console.log('pixelsPerSecond:', pixelsPerSecond)

    let slider = this.api.videogularElement.getElementsByClassName("slider")[0]
    let sliderLocation = slider.getBoundingClientRect();
    this.playerRatios.sliderLocation = sliderLocation;

    // Set to html
    this.addAnnotationToHtml(currentSecond, sliderLocation, pixelsPerSecond)
  }

  addAnnotationToHtml(currentSecond: any, sliderLocation: any, pixelsPerSecond: any) {
    let locationMetadata: any = {
      currentSecond: currentSecond,
      pixelsPerSecond: pixelsPerSecond,
      y_sliderOffset: 15
    }

    this.addTimeSignatureToDom(locationMetadata)
  }

  adjustAnnotations() {

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
      this.api.getDefaultMedia().subscriptions.seeking.subscribe((res:Event) => {
        // this.setSelectedSignature(res.timeStamp)
        console.log(this.setSelectedSignature(res.timeStamp))
      })
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

  getTime() {
    console.log('whats thi')
    console.log('this.api.time')
    console.log(this.api.time)
    console.log('console.log(this.api.duration):')
    console.log(console.log(this.api.duration))
  }

  getSlider() {

  }

  getScrubBarWidth() {

  }
  //TODO: Fill in the below functions
  fileOver(idkYet: any) {

  }

  fileLeave(idkYet: any) {

  }
}
