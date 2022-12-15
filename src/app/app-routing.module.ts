import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UploadVideoComponent} from "./upload-video/upload-video.component";
import {SaveVideoDetailsComponent} from "./save-video-details/save-video-details.component";
import {VideoDetailComponent} from "./video-detail/video-detail.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {BoardAdminComponent} from "./board-admin/board-admin.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'upload-video', component: UploadVideoComponent},
  {path: 'save-video-details/:videoId', component: SaveVideoDetailsComponent},
  {path: 'video-details/:videoId', component: VideoDetailComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: BoardAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

