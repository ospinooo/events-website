import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'COntent-Type': 'application/json' })
};

export class JwtResponse {
  token: string;
  type: string;
  username: string;
  authorities: string[];
}


export class LoginInfo {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class SignupInfo {

  username: string;
  role: string[];
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.role = ['user'];
    this.password = password;
  }
}


export enum Role {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER"
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = 'http://localhost:8080/auth/signin';
  private signupUrl = 'http://localhost:8080/auth/signup';


  constructor(private http: HttpClient) { }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignupInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
}
