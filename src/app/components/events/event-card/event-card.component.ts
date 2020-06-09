import { Component, OnInit, Input } from '@angular/core';
import { Event, getCheapestPrice, getHighestPrice } from '../../../models/event.model';
import { getTodayString } from 'src/app/helpers/date';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event_model: Event = undefined;
  pastEvent: boolean;
  constructor() { }

  ngOnInit(): void {
    this.pastEvent = new Date(this.event_model.date) < new Date(getTodayString());
  }

  getEventCheapestPrice() {
    return getCheapestPrice(this.event_model);
  }

  getEventHighestPrice() {
    return getHighestPrice(this.event_model);
  }

}
