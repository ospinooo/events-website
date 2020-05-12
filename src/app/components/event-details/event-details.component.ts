import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Event } from './event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  id: number;
  event_model: Event;
  sub;
  fees = [
    { 'name': "fee1" },
    { 'name': "fee2" },
    { 'name': "fee3" }
  ];

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.event_model = this.eventsService.getEvent(this.id);
    })
  }

  getEvent() {
    // this.eventsService.getEvent(this.id).subscribe((contact) => {
    //   this.id = contact.id;
    //   this.firstname = contact.firstname;
    //   this.lastname = contact.lastname;
    //   this.email = contact.email;
    //   this.telephone = contact.telephone;
    // })

    this.event_model = this.eventsService.getEvent(this.id);
  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  openBuyTicketsModal() {
    document.getElementById("buy_tickets_modal").classList.add("is-active");
    document.getElementById("buy_tickets_modal").classList.add("is-clipped");
  }

  closeBuyTicketsModal() {
    document.getElementById("buy_tickets_modal").classList.remove("is-active");
    document.getElementById("buy_tickets_modal").classList.remove("is-clipped");
  }
}
