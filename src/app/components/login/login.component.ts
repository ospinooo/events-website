import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService, LoginInfo, Role } from 'src/app/auth/authentication.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  roles: Role[];

  @Output() isSignInEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private authService: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    // Check if it is already logged
    if (this.tokenStorage.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }


  signIn(username: string, password: string) {

    this.authService.attemptAuth(new LoginInfo(username, password))
      .subscribe(
        data => {
          // Save data
          console.log("SUCCESS")
          console.log(data);
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);


          this.isLogged = true;
          this.roles = this.tokenStorage.getAuthorities();

          this.isSignInEmitter.emit(true);
        },
        error => {
          console.log(error);
        }
      )
  }

}
