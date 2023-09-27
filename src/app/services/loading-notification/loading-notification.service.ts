import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingNotificationService {
 loadingIndicatorRef = document.getElementById('loadingIndicator')


  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor() { }

  show(){
    this.loadingSubject.next(true);
    interval(1000).subscribe(res => {
      console.log(this.loadingIndicatorRef )
    })
    
    this.loadingIndicatorRef?.setAttribute("style","display:flex");

  }

  hide(){
    this.loadingSubject.next(false);
    this.loadingIndicatorRef?.setAttribute("style","display:none");
  }

}
