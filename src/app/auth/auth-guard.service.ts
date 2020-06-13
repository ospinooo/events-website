
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public token: TokenStorageService, public router: Router) { }


  canActivate(): boolean {

    if (!this.token.isLogged()) {
      this.router.navigate(['']);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to be a user to access this',
      });
      return false;
    }

    return true;
  }
}
