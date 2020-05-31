
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public token: TokenStorageService, public router: Router) { }


  canActivate(): boolean {

    if (!this.token.isLogged()) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
