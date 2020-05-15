import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../event-details/event.model';


enum Direction {
  ASC = "ASC",
  DESC = "DESC"
};

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  eventsList: Event[];

  page: number;
  sortKey: String;
  dir: Direction;

  /**
   * Each time we construct the events list we are going to pass in params a Search key
   */
  constructor(private eventsService: EventsService) {

  }

  ngOnInit(): void {
    this.getEvents();
  }

  range(end): Array<Number> {
    var ans = [];
    for (let i = 0; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

  getEvents(): void {
    this.eventsService.getEvents()
      .subscribe(eventsList => {
        console.log("HOLAA");
        this.eventsList = eventsList.content
      });
  }
}
