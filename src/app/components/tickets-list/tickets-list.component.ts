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

  totalPages: number;
  currentNumberPages: number;
  page: number;

  PAGESIZE = 16;

  constructor(private ticketsService: TicketsService) {
    this.page = 0;
    this.currentNumberPages = 1;
  }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets() {
    this.ticketsService.getTickets()
      .subscribe(data => {
        this.tickets = data.content;
      })
  }

  onScrollDown(ev) {
    console.log('scrolled down!!', ev);

    // Activate loading.
    // document.getElementById("loading-contianer").style.display = 'flex';

    // add another 10 items
    this.ticketsService.getTickets(this.currentNumberPages)
      .subscribe(data => {
        this.tickets = this.tickets.concat(data.content);
        if (data.content.length > 0) {
          this.currentNumberPages += 1;
        }
        // delete loading.
        // document.getElementById("loading-contianer").style.display = 'none';
      })
  }

  onUp(ev) {
    console.log('scrolled up!', ev);
    // Delete the rest
    this.tickets = this.tickets.filter((e, i) => i < this.PAGESIZE)
    // Reset
    this.currentNumberPages = 1;
  }


}
