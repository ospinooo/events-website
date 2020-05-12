import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  is_active = false;

  constructor() { }

  ngOnInit(): void {
  }

  collapse() {
    if (!this.is_active) {
      document.getElementById("navbar-burger").classList.add("is-active");
      document.getElementById("navbar-menu").classList.add("is-active");
      console.log("HELO");
      this.is_active = true;
    } else {
      document.getElementById("navbar-burger").classList.remove("is-active");
      document.getElementById("navbar-menu").classList.remove("is-active");
      this.is_active = false;
    }
  }

  openModalSignUp() {
    document.getElementById("sign_up_modal").classList.add("is-active");
    document.getElementById("sign_up_modal").classList.add("is-clipped");
  }

  closeModalSignUp() {
    document.getElementById("sign_up_modal").classList.remove("is-active");
    document.getElementById("sign_up_modal").classList.remove("is-clipped");
  }

  openModalSignIn() {
    document.getElementById("sign_in_modal").classList.add("is-active");
    document.getElementById("sign_in_modal").classList.add("is-clipped");

  }

  closeModalSignIn() {
    document.getElementById("sign_in_modal").classList.remove("is-active");
    document.getElementById("sign_in_modal").classList.remove("is-clipped");
  }

  signUp() {
    console.log("signUp");
  }

  signIn() {
    console.log("signIn");
  }
}
