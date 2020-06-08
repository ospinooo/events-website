import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService, LoginInfo, Role } from 'src/app/auth/authentication.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Bulma from '@vizuaalog/bulmajs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  roles: Role[];

  error_signin: string = "";
  @Output() isSignInEmitter: EventEmitter<boolean> = new EventEmitter();

  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  noAccount() {
    this.isSignInEmitter.emit(false);
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    // Check if it is already logged
    if (this.tokenStorage.getToken()) {
      this.isLogged = true;

      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    this.authService.attemptAuth(
      new LoginInfo(
        this.loginForm.value.username,
        this.loginForm.value.password))
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

          Bulma.create('notification', {
            body: 'Welcome again to MusicMeets! 🎉',
            color: 'success',
            isDismissable: true,
            parent: document.getElementById('notification'),
          }).show();
        },
        error => {
          console.log(error);
          this.error_signin = "Credentials don't match";
        }
      )
  }

}
