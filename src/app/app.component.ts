import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get, set } from 'idb-keyval';
import { CentralService } from './services/central.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHomePage = false;

  constructor(
    private router: Router,
    public centralService: CentralService) { }

  ngOnInit(): void { 
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/home'; // Check if URL is '/'
    });
  }

  navigateHome() {
    this.router.navigate(['/home']);
    this.centralService.setTitle('')
  }
}
