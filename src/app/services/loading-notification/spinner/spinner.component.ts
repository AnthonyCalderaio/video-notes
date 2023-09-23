import { Component } from '@angular/core';
import { LoadingNotificationService } from '../loading-notification.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  constructor(public loader: LoadingNotificationService) { }

  loadingVerbiage:string = '.';

  ngOnInit(): void {
    interval(200).subscribe(x => {
      this.handleLoadingVerbiage()
      });
  }

  handleLoadingVerbiage() {
    if (this.loadingVerbiage === '...') {
      this.loadingVerbiage = '.'
    } else {
      this.loadingVerbiage = this.loadingVerbiage.concat('.')
    }
  }

}
