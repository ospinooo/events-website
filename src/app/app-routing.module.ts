import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateEventComponent } from './components/events/create-event/create-event.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';


const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: "events/:id", component: EventDetailsComponent },
  { path: "about", component: AboutComponent },
  { path: "profile", component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'event/create', component: CreateEventComponent },
  { path: 'event/edit', component: EditEventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
