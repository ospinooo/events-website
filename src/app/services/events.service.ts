import { Injectable } from '@angular/core';
import { Event } from '../components/event-details/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events = [
    new Event("Event 1 ", "Event 1 DESCRIPTION", 1),
    new Event("Event 2 ", "Event 2 DESCRIPTION", 2),
    new Event("Event 3 ", "Event 3 DESCRIPTION", 3),
    new Event("Event 4 ", "Event 4 DESCRIPTION", 4),
    new Event("Event 5 ", "Event 5 DESCRIPTION", 5),
    new Event("Event 6 ", "Event 6 DESCRIPTION", 6),
    new Event("Event 7 ", "Event 7 DESCRIPTION", 7),
    new Event("Event 8 ", "Event 8 DESCRIPTION", 8),
    new Event("Event 9 ", "Event 9 DESCRIPTION", 9),
    new Event("Event 10 ", "Event 10 DESCRIPTION", 10),
  ]


  constructor() {
  }

  getEvents(): Array<Event> {
    return this.events;
  }

  getEvent(id: number): Event {
    return this.events[id];
  }
}
