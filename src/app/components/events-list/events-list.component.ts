import { Component, OnInit } from '@angular/core';
import { Event } from '../event-details/event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  events = [
    new Event("Event 1 ", 1),
    new Event("Event 2 ", 2),
    new Event("Event 3 ", 3),
    new Event("Event 4 ", 4),
    new Event("Event 5 ", 5),
    new Event("Event 6 ", 6),
    new Event("Event 7 ", 7),
    new Event("Event 8 ", 8),
    new Event("Event 9 ", 9),
    new Event("Event 10 ", 10),
  ]


  /**
   * Each time we construct the events list we are going to pass in params a Search key
   */
  constructor() {

  }

  ngOnInit(): void {

  }

  range(end): Array<Number> {
    var ans = [];
    for (let i = 0; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

}
