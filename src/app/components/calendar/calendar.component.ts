import { Component, OnInit } from '@angular/core';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../models/event.model';
import { getTodayString } from 'src/app/helpers/date';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: Event[] = [];
  PAGESIZE: number = 9;
  currentNumberPages: number;
  page: number;

  date_init: string;
  date_end: string;

  constructor(private eventsService: EventsService) {
    this.page = 0;
    this.currentNumberPages = 1;
  }

  ngOnInit(): void {
    // Get the data from today.
    this.eventsService.getEventsByDate(this.page, getTodayString(), getTodayString())
      .subscribe(data => {
        this.events = data.content;
      })


    // Initialize all input of date type.
    const calendars = bulmaCalendar.attach('[type="date"]', {
      displayMode: 'inline',
      dateFormat: 'YYYY-MM-DD',
      startDate: getTodayString(),
      endDate: getTodayString(),
      weekStart: 1,
      lang: "en",
      isRange: true,
    });

    // Loop on each calendar initialized
    calendars.forEach(calendar => {
      // Add listener to date:selected event
      calendar.on('date:selected', date => {
        console.log(date);
      });
    });

    // To access to bulmaCalendar instance of an element
    const element: any = document.querySelector('#calendar');
    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        let ls = datepicker.data.value().split(" - ");
        this.date_init = ls[0];
        this.date_end = ls[1];
        this.eventsService.getEventsByDate(this.page, this.date_init, this.date_end)
          .subscribe(data => {
            this.events = data.content;
          })
      });
    }
  }

  onScrollDown(ev) {
    console.log('scrolled down!!', ev);

    this.eventsService.getEventsByDate(this.currentNumberPages, this.date_init, this.date_end)
      .subscribe(data => {
        this.events = this.events.concat(data.content);
        if (data.content.length > 0) {
          this.currentNumberPages += 1;
        }
      })
  }


  onUp(ev) {
    console.log('scrolled up!', ev);
    // Delete the rest
    this.events = this.events.filter((e, i) => i < this.PAGESIZE)
    // Reset
    this.currentNumberPages = 1;
  }
}
