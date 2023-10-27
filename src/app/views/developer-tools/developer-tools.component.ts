import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-developer-tools',
  templateUrl: './developer-tools.component.html',
  styleUrls: ['./developer-tools.component.css']
})
export class DeveloperToolsComponent {

  savedUserData: any;
  savedVideos: any;

  constructor(public storageService: StorageService){}

  ngOnInit(): void {
    
    this.storageService.getUserData().subscribe(res => this.savedUserData = res)
  }

}
