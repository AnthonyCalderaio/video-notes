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

  constructor(private router: Router,
    public centralService: CentralService) { }

  ngOnInit(): void { }

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
