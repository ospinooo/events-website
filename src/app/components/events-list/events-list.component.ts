import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../event-details/event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {


  events;

  /**
   * Each time we construct the events list we are going to pass in params a Search key
   */
  constructor(private eventsService: EventsService) {

  }

  ngOnInit(): void {
    this.events = this.eventsService.getEvents();
  }

  range(end): Array<Number> {
    var ans = [];
    for (let i = 0; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

}
