import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  constructor() {
    interval(2000).subscribe(res => {
      // console.log(this.currentVideoTitle)
    })
    this.title$.subscribe(
      res => {
        this.currentVideoTitle = res;
      });
  }


  currentVideoTitle: string = '';

  setTitle(newTitle: string) {
    this.titleSubject.next(newTitle)
  }


}
