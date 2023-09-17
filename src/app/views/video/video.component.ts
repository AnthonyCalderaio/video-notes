import { Component, Input, OnInit, ViewChild, AfterViewChecked, AfterContentChecked, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage-service.service';
import { VgApiService, VgMediaDirective } from '@videogular/ngx-videogular/core';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrubBar') scrubBar: any;
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
  event.target.innerWidth;
  console.log(event.target.innerWidth)
}

 
  src: any = undefined;
  api!: VgApiService;
  myColor = 'red';

  
 playerRatios = {
    barWidth: undefined,
    duration: undefined,
    pixelsPerSecond: undefined
  } as any

  notesObject:any = {

  }
  addTime(){
    let currentTime = this.api.time.current;
    console.log(currentTime)
    let currentSecond = String(Math.floor(currentTime/1000));
    console.log(currentSecond)
    this.notesObject[currentSecond] = 'some note'
    console.log(this.notesObject)
  }

  timeSignatureStyles(timeSignature:number){
    console.log('got:'+timeSignature)
    return {
      'position': 'absolute', 
      'left': Number(timeSignature) * this.playerRatios.pixelsPerSecond + 7,
      'top': '100px',
      'color':'red'
    }
  }

  getScrubBar(){
    // Get time codes
    let currentTime = this.api.time.current;
    console.log(currentTime)
    let currentSecond = String(currentTime/1000);
    console.log(currentSecond)
    this.notesObject[currentSecond] = 'some note'
    console.log(this.notesObject)
    this.notesObject[currentSecond] = 'notes';


    // Get dimensions
    // console.log(this.scrubBar)
    let barWidth = this.scrubBar.elem.clientWidth;
    console.log('barWidth',barWidth)
    let duration = this.api.duration;
    console.log('duration:',duration)
    let pixelsPerSecond = barWidth/duration;
    console.log('pixelsPerSecond:',pixelsPerSecond)

    let slider = this.api.videogularElement.getElementsByClassName("slider")[0]
    let sliderLocation = slider.getBoundingClientRect();
    console.log('sliderLocation:')
    console.log(sliderLocation)
   
    // Set to html
    this.addAnnotationToHtml(currentSecond, sliderLocation,pixelsPerSecond)

    

  }

  addAnnotationToHtml(currentSecond: any, sliderLocation:any, pixelsPerSecond: any){
    const para = document.createElement("p");
    const node = document.createTextNode("I");
    para.appendChild(node);
    // let newTitleElem: any;
    // newTitleElem = document.createElement('span');
    // newTitleElem.innerHTML = `<span 
    // [style.color]="myColor"
    // attr.id="${currentSecond}"
    // [class]="23"
    // [ngStyle]="timeSignatureStyles({this.id})"
    // >I</span>`;
    // let para =  newTitleElem
    // 
    // let x = sliderLocation.x+7;
    // let y = sliderLocation.y+10;
    let x = Number(currentSecond) * pixelsPerSecond + 7;
    console.log("currentSecond")
    console.log(currentSecond)
    console.log("pixelsPerSecond")
    console.log(pixelsPerSecond)
    console.log("x")
    console.log(x)
    let y = sliderLocation.y+15;
    para.className="here"
    para.style.position = "absolute";
    para.style.left = x + 'px';
    para.style.top = y + 'px';
    para.style.color = 'red';

    // add it to body
    const  element = document.getElementById("noteBar");
    element?.appendChild(para);
  }

  adjustAnnotations(){

  }

  constructor(private route: ActivatedRoute, private storageService: StorageService) { }

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

      setTimeout(() => {
        console.log('whats thi')
        console.log(this.api.duration)
      }, 2000);
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

  getTime(){
    console.log('whats thi')
    console.log('this.api.time')
        console.log(this.api.time)
        console.log('console.log(this.api.duration):')
        console.log(console.log(this.api.duration))
  }

  

 

  getSlider(){
    
  }

  getScrubBarWidth(){

  }
}
function ngAfterViewChecked() {
  throw new Error('Function not implemented.');
}

