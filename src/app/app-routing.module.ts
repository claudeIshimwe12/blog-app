import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CreateBlogPageComponent } from './pages/create-blog-page/create-blog-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: SignInComponent },
  { path: 'sign-in', component: LogInComponent },
  { path: 'create-blog', component: CreateBlogPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
