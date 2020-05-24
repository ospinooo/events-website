import { Component, OnInit, ViewChild } from '@angular/core';
import { SignupInfo } from 'src/app/auth/authentication.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  is_active = false;
  isSignIn = false;

  events: Event[];

  constructor(public tokenStorageService: TokenStorageService,
    private eventsService: EventsService) {
    this.events = []
  }

  ngOnInit(): void {

  }

  getEventsByTitle(title: string) {
    this.eventsService.getEventsByTitle(title)
      .subscribe(eventsList => {
        this.events = eventsList.content;
      });
  }

  collapse() {
    if (!this.is_active) {
      document.getElementById("navbar-burger").classList.add("is-active");
      document.getElementById("navbar-menu").classList.add("is-active");
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

  isSignUpEmitter(isSignUp) {
    if (isSignUp) {
      this.closeModalSignUp();
    }

    this.isSignIn = isSignUp;
  }

  isSignInEmitter(isSignIn) {
    this.closeModalSignIn();
    if (!isSignIn) {
      this.openModalSignUp();
    }
    this.isSignIn = isSignIn;
  }

  getUsername(): string {
    let username: string = this.tokenStorageService.getUsername();
    return username;
  }

}
