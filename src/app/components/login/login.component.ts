import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    // Check if it is already logged
    if (this.tokenStorage.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }



  signIn() {
    console.log("signIn");
  }

  onSubmit() {

    let username: string = "ospino";
    let password: string = "1234567";

    this.authService.attemptAuth(new LoginInfo(username, password))
      .subscribe(
        data => {
          // Save data
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          //
          this.isLogged = true;
          this.roles = this.tokenStorage.getAuthorities();
        },
        error => {
          console.log(error);
        }
      )
  }

}
