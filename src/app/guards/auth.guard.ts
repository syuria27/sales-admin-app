import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    console.log('Cek auth guard');
    if (this.auth.sudahLogin()) {
      if (this.auth.isAdmin) {
        return true;
      } else if (this.auth.isUser) {
        return true;
      } else {
        return false;
      }
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
