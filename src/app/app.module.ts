import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { LateralNavbarComponent } from './components/lateral-navbar/lateral-navbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { httpInterceptorProviders } from './auth/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    LateralNavbarComponent,
    NavbarComponent,
    EventCardComponent,
    EventDetailsComponent,
    PaymentModalComponent,
    AboutComponent,
    ProfileComponent,
    AdminComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
