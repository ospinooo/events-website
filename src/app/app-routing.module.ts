import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { TicketsListComponent } from './components/tickets-list/tickets-list.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AdminGuardService } from './auth/admin-guard.service';


const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: "about", component: AboutComponent },
  { path: 'calendar', component: CalendarComponent },

  // AUTH
  { path: 'events/created', component: EventsListComponent, canActivate: [AuthGuardService] },
  { path: "events/:id", component: EventDetailsComponent, canActivate: [AuthGuardService] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'tickets', component: TicketsListComponent, canActivate: [AuthGuardService] },

  // ADMIN
  { path: 'event/create', component: CreateEventComponent, canActivate: [AdminGuardService] },
  { path: 'event/edit/:id', component: EditEventComponent, canActivate: [AdminGuardService] },

  // REDIRECT
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
