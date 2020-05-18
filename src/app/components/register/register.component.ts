import { Component, OnInit, ɵConsole, EventEmitter, Output } from '@angular/core';
import { AuthenticationService, SignupInfo } from 'src/app/auth/authentication.service';

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


  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  /**
   * Submit register
   */
  onSubmit(name: string, username: string, email: string, email2: string, password: string, password2: string, checkbox: string) {

    // data
    this.signupInfo = new SignupInfo(name, username, email, password);

    // Register
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        // Success
        console.log("Success");
        console.log(data);
        this.isSignUpEmitter.emit(true);
        // this.isSignedUp = true;
        // this.isSignUpFailed = false;
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


  checkEmail2(email: string, email2: string) { }

  checkPassword2(password: string, password2: string) { }

  checkUsername(username: string) { }

  checkEmail(email: string) { }

  log(str) {
    console.log(str);
  }
}
