import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import Bulma from '@vizuaalog/bulmajs';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-lateral-navbar',
  templateUrl: './lateral-navbar.component.html',
  styleUrls: ['./lateral-navbar.component.css']
})
export class LateralNavbarComponent implements OnInit {

  active: string;

  constructor(public tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

  newActive(active: string) {
    this.active = active;
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.tokenStorageService.signOut();
        Swal.fire(
          'Logged Out',
          'See you soon 👋🏼',
          'success'
        )
      }
    })
  }
}
