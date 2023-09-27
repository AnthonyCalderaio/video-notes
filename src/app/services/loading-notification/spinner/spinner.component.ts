import { Component } from '@angular/core';
import { LoadingNotificationService } from '../loading-notification.service';
import { BehaviorSubject, interval } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  constructor(public loader: LoadingNotificationService) { }

  loadingVerbiage: string = 'Loading';


  ngOnInit(): void {
    interval(200).subscribe(x => {
      this.handleLoadingVerbiage()
    });
    this.listenForVerbiageChange()
  }

  listenForVerbiageChange() {
    this.loader.loadingVerbiage$.subscribe(verbiageChange => {
        this.loadingVerbiage = verbiageChange;
      })
  }


  handleLoadingVerbiage() {
    if (this.loadingVerbiage === 'Loading...') {
      this.loadingVerbiage = 'Loading'
    } else {
      this.loadingVerbiage = this.loadingVerbiage.concat('.')
    }
  }

}
