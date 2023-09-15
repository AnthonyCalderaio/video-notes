import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';

const routes: Routes = [
  { path: 'uploader', component: UploaderComponent },
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

