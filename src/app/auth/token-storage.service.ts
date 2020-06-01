import { Injectable } from '@angular/core';
import { Role } from './authentication.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<Role>;
  constructor(private router: Router) { }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigate(['']);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): Role[] {
    this.roles = new Array<Role>();

    if (sessionStorage.getItem(TOKEN_KEY) != null) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        if (authority.authority == Role.ADMIN) {
          this.roles.push(Role.ADMIN);
        } else if (authority.authority == Role.USER) {
          this.roles.push(Role.USER);
        }
      });
    }

    return this.roles;
  }

  public isAdmin(): boolean {
    return this.getAuthorities().includes(Role.ADMIN);
  }

  public isLogged(): boolean {
    return sessionStorage.getItem(TOKEN_KEY) != null;
  }
}
