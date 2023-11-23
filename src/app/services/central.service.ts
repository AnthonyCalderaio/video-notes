import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  constructor() { }

  currentVideoTitle: string = '';

  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle)
  }
}
