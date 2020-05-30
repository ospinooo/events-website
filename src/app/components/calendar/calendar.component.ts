import { Component, OnInit } from '@angular/core';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    // Initialize all input of date type.
    const calendars = bulmaCalendar.attach('[type="date"]', {
      displayMode: 'inline',
      dateFormat: 'YYYY-MM-DD'
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
        this.eventsService.getEventsByDate(datepicker.data.value())
          .subscribe(data => {
            this.events = data.content;
          })
      });
    }
  }

}
