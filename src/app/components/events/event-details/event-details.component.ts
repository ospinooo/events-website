import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Event, getCheapestPrice } from '../../../models/event.model';
import { getTodayString } from 'src/app/helpers/date';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input() event_model: Event;

  id: number;
  sub;
  pastEvent: boolean;

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {

  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getEvent();
      this.pastEvent = new Date(this.event_model.date) < new Date(getTodayString());
    })
  }

  getEvent() {
    this.eventsService.getEvent(this.id)
      .subscribe((event) => this.event_model = event)
  }

  getEventCheapestPrice() {
    return getCheapestPrice(this.event_model);
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  openBuyTicketsModal() {
    document.getElementById("buy_tickets_modal").classList.add("is-active");
  }

  closeBuyTicketsModal() {
    document.getElementById("buy_tickets_modal").classList.remove("is-active");
  }

  log(s) {
    console.log(s);
  }


}
