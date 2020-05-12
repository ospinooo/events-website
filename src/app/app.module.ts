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

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    LateralNavbarComponent,
    NavbarComponent,
    EventCardComponent,
    EventDetailsComponent,
    PaymentModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
