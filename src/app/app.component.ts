import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private autService: AuthService) {}
  ngOnInit(): void {
    this.autService.user$.subscribe((user: any) => {
      if (user) {
        this.autService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
          photoUrl: user.photoURL!,
        });
      } else {
        this.autService.currentUserSig.set(null);
      }
    });
  }
}
