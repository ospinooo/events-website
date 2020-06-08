import { Component, OnInit, Input } from '@angular/core';
import { Event, getCheapestPrice, getHighestPrice } from '../../../models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event_model: Event = undefined;

  constructor() { }

  ngOnInit(): void { }

  getEventCheapestPrice() {
    return getCheapestPrice(this.event_model);
  }

  getEventHighestPrice() {
    return getHighestPrice(this.event_model);
  }

}
