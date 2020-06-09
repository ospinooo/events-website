import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../models/event.model';
import { ActivatedRoute } from '@angular/router';


enum Direction {
  ASC = "ASC",
  DESC = "DESC"
};


const ROW_SIZE = 3;

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  eventsList: Event[] = [];

  PAGESIZE: number = 9;

  page: number;
  sortKey: String;
  dir: Direction;

  dropdownActive: boolean = false;

  descAscActive: string = 'asc';
  sortActive: string = 'title';

  totalPages: number;
  currentNumberPages: number;

  /**
   * Each time we construct the events list we are going to pass in params a Search key
   */
  constructor(private eventsService: EventsService, private route: ActivatedRoute) {
    this.page = 0;
    this.currentNumberPages = 1;
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
    this.eventsList = [];
    this.currentNumberPages = 1;
    this.eventsService.getEvents(0, this.descAscActive, this.sortActive)
      .subscribe(eventsList => {
        this.eventsList = eventsList.content;
        this.totalPages = eventsList.totalPages;
      });
  }

  getRows(): Array<Number> {
    return this.range(Math.ceil(this.eventsList.length / ROW_SIZE));
  }

  getMidPages(): number {
    return Math.ceil(this.totalPages / 2);
  }

  onScrollDown(ev) {
    console.log('scrolled down!!', ev);

    // Activate loading.
    // document.getElementById("loading-contianer").style.display = 'flex';

    // add another 10 items
    this.eventsService.getEvents(this.currentNumberPages, this.descAscActive, this.sortActive)
      .subscribe(data => {
        this.eventsList = this.eventsList.concat(data.content);
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
    this.eventsList = this.eventsList.filter((e, i) => i < this.PAGESIZE)
    // Reset
    this.currentNumberPages = 1;
  }

  getCurrentNumberPages() {
    return Array(this.currentNumberPages);
  }

}
