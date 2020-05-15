import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event-details/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input() event_model: Event;

  constructor() { }

  ngOnInit(): void { }


}
