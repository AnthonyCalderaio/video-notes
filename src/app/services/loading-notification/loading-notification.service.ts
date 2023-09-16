import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingNotificationService {
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  constructor() { }

  show(){
    this.loadingSubject.next(true);
  }

  hide(){
    this.loadingSubject.next(false);
  }
}
