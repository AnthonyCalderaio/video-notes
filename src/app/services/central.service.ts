import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();
  isPremium: boolean = false; 

  constructor() {  }

  currentVideoTitle: string = '';

  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle)
  }

  isPremiumUser(){
    return this.isPremium;
  }

}
