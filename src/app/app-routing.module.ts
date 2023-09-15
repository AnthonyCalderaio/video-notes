import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';
import { HomeViewComponent } from './home-view/home-view.component';

const routes: Routes = [
  { path: 'uploader', component: UploaderComponent },
  { path: 'home', component: HomeViewComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations:[],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,]
})
export class AppRoutingModule { }

