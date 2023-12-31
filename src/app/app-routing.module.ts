import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderComponent } from './views/uploader/uploader.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { VideoComponent } from './views/video/video.component';
import { DeveloperToolsComponent } from './views/developer-tools/developer-tools.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'video', component: VideoComponent },
  { path: 'uploader', component: UploaderComponent },
  { path: 'home', component: HomeViewComponent },
  { path: 'developer-tools', component: DeveloperToolsComponent},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,]
})
export class AppRoutingModule { }

