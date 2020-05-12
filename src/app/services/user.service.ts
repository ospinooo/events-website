import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private userUrl = 'http://localhost:8080/restApi/exampleSecurity/user';
  // private adminUrl = 'http://localhost:8080/restApi/exampleSecurity/admin';

  // constructor(private http: HttpClient) { }

  // getUserPage(): Observable<string> {
  //   return this.http.get(this.userUrl, { responseType: 'text' });
  // }

  // getAdminPage(): Observable<string> {
  //   return this.http.get(this.adminUrl, { responseType: 'text' });
  // }

}
