import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  board: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.getUserPage().subscribe(
    //   data => {
    //     this.board = "data";
    //   },
    //   error => {
    //     this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
    //   }
    // );
  }

}
