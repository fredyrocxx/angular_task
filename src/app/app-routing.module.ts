import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageUserComponent } from './user/manage-user/manage-user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
