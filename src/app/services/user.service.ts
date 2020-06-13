import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from './http/http.options';
import { tap, catchError } from 'rxjs/operators';
import { ValidUserInfo } from './res/valid.user';
import { User } from './res/user.interface';
import { TokenStorageService } from '../auth/token-storage.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authUrl = environment.apiUrl + '/auth';
  private usersUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  /** Valid Username: Check if the user is valid */
  isValidUserName(username: string): Observable<ValidUserInfo> {
    const url = `${this.authUrl}/valid?username=${username}`;
    return this.http.get<ValidUserInfo>(url, httpOptions).pipe(
      tap(_ => this.log(`valid username ${username}`)),
      catchError(this.handleError<ValidUserInfo>('ValidUsername'))
    );
  }

  /** Valid User: Check if the user is valid */
  isValidUser(username: string, email: string): Observable<ValidUserInfo> {
    const url = `${this.authUrl}/valid?username=${username}&email=${email}`;
    return this.http.get<ValidUserInfo>(url, httpOptions).pipe(
      tap(_ => this.log(`valid username ${username}`)),
      catchError(this.handleError<ValidUserInfo>('ValidUsername'))
    );
  }

  /** Valid email: Check if the user is valid */
  isValidEmail(email: string): Observable<ValidUserInfo> {
    const url = `${this.authUrl}/valid?email=${email}`;
    return this.http.get<ValidUserInfo>(url, httpOptions).pipe(
      tap(_ => this.log(`valid email ${email}`)),
      catchError(this.handleError<ValidUserInfo>('Validemail'))
    );
  }

  /** Get User Data */
  getUserData(username: string): Observable<User> {
    const url = `${this.usersUrl}/username/${username}`;
    return this.http.get<User>(url, httpOptions).pipe(
      tap(_ => this.log(`User = ${username}`)),
      catchError(this.handleError<User>('UserData'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      if (error.status == 401) {
        this.tokenStorageService.signOut();
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EventService message with the MessageService */
  private log(message: string) {
    console.log('EventService: ' + message);
  }
}
