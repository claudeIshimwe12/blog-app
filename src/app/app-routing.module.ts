import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CreateBlogPageComponent } from './pages/create-blog-page/create-blog-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { BlogEditPageComponent } from './pages/blog-edit-page/blog-edit-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  { path: 'sign-in', component: LogInComponent },
  { path: 'register', component: SignInComponent },

  { path: 'home', canActivate: [AuthGuard], component: HomePageComponent },
  {
    path: 'create-blog',
    canActivate: [AuthGuard],
    component: CreateBlogPageComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePageComponent,
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: BlogEditPageComponent,
  },
  { path: 'blogs/:id', canActivate: [AuthGuard], component: BlogPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
