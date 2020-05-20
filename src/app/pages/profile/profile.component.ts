import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/res/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  board: string;
  errorMessage: string = "";
  use: number;
  userData: User;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData(this.tokenStorageService.getUsername()).subscribe(
      data => {
        this.userData = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

}
