import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/services/tickets.service';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  tickets: Ticket[] = [];

  constructor(private ticketsService: TicketsService) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.ticketsService.getTickets()
      .subscribe(data => {
        console.log(data.content);
        this.tickets = data.content;
      })
  }

}
