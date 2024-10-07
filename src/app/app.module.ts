import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { CreateBlogPageComponent } from './pages/create-blog-page/create-blog-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BlogComponent } from './components/blog/blog.component';
import { environment } from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PublishedBlogComponent } from './components/published-blog/published-blog.component';
import { BlogEditPageComponent } from './pages/blog-edit-page/blog-edit-page.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    FooterComponent,
    SignInComponent,
    LogInComponent,
    CreateBlogPageComponent,
    BlogComponent,
    TimeAgoPipe,
    LoaderComponent,
    ProfilePageComponent,
    PublishedBlogComponent,
    BlogEditPageComponent,
    BlogPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp({"projectId":"blog-app-lab","appId":"1:760137923827:web:4f3eb9ee6d69f43d804b86","storageBucket":"blog-app-lab.appspot.com","apiKey":"AIzaSyDErNtXiaO8zmtfLHcNYaqGDHRH-_q8Pnc","authDomain":"blog-app-lab.firebaseapp.com","messagingSenderId":"760137923827","measurementId":"G-9BN7B1630Q"})),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideStorage(() => getStorage()),
    provideFunctions(() => getFunctions()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
