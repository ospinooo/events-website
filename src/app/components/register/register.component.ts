import { Component, OnInit } from '@angular/core';
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


  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  signUp() {
    console.log("signUp");
  }

  /**
   * Submit register
   */
  onSubmit() {
    console.log(this.form);


    // data
    this.signupInfo = new SignupInfo(this.form.username, this.form.password);

    // Register
    this.authService.signUp(this.signupInfo).subscribe(
      data => { // Success
        console.log(data)
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => { // Error
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
