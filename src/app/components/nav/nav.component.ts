import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  showMenu: boolean = false;
  authService = inject(AuthService);

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logOut() {
    this.authService.logout();
  }
}
