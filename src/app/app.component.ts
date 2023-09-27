import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get, set } from 'idb-keyval';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
  }

  navigateHome(){
    console.log('hi')
    this.router.navigate(['/home']);
  }
}
