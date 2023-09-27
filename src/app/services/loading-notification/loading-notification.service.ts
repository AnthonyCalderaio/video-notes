import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingNotificationService {
  public loadingIndicatorRef = document.getElementById('loadingIndicator');

  private loadingActiveSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingActiveSubject.asObservable();

  private loadingVerbiageSubject = new BehaviorSubject<string>('Loading');
  loadingVerbiage$ = this.loadingVerbiageSubject.asObservable();

  constructor() { }

  show(verbiage = 'Loading') {
    this.loadingVerbiageSubject.next(verbiage)
    this.loadingActiveSubject.next(true);
    this.loadingIndicatorRef?.setAttribute("style", "display:flex");
  }

  hide() {
    this.loadingActiveSubject.next(false);
    this.loadingIndicatorRef?.setAttribute("style", "display:none");
  }
}
