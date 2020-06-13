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

  constructor(private eventsService: EventsService) {

  }

  ngOnInit(): void {
    // Get the data from today.
    this.eventsService.getEventsByDate(getTodayString(), getTodayString())
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
        let date_init: string = ls[0];
        let date_end: string = ls[1];
        this.eventsService.getEventsByDate(date_init, date_end)
          .subscribe(data => {
            this.events = data.content;
          })
      });
    }
  }

}
