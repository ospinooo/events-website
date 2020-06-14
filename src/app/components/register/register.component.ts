import { Component, OnInit, ɵConsole, EventEmitter, Output } from '@angular/core';
import { AuthenticationService, SignupInfo, LoginInfo } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import Bulma from '@vizuaalog/bulmajs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  form: any = {};
  signupInfo: SignupInfo;

  errorMessage: string = '';

  isSignUpFailed: boolean = false;
  isSignedUp: boolean = false;

  @Output() isSignUpEmitter: EventEmitter<boolean> = new EventEmitter();

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$_!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])],
      password2: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      checkbox: [false, Validators.requiredTrue],
    }, {
      validator: MustMatch('password', 'password2')
    })
  }

  ngOnInit(): void {
  }

  /**
   * Submit register
   */
  onSubmit() {
    console.log(this.registerForm.value);
    // data
    this.signupInfo = new SignupInfo(
      this.registerForm.value.name,
      this.registerForm.value.username,
      this.registerForm.value.password,
      this.registerForm.value.email
    );

    // Register
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        // Success
        console.log("Success");
        console.log(data);
        this.isSignUpEmitter.emit(true);
        // this.isSignedUp = true;
        // this.isSignUpFailed = false;
        this.authService.attemptAuth(
          new LoginInfo(
            this.registerForm.value.username,
            this.registerForm.value.password))
          .subscribe(
            data => {
              // Save data
              console.log("SUCCESS")
              console.log(data);
              this.tokenStorage.saveToken(data.token);
              this.tokenStorage.saveUsername(data.username);
              this.tokenStorage.saveAuthorities(data.authorities);

              Bulma.create('notification', {
                body: 'Welcome to MusicMeets! 🎉',
                color: 'success',
                isDismissable: true,
                parent: document.getElementById('notification'),
              }).show();
            }
          )
      },
      error => {
        // Error
        console.log(error);
        this.isSignUpEmitter.emit(false);
        // this.errorMessage = error.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }
}
