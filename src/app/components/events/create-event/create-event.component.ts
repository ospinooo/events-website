import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Fee } from 'src/app/models/fee.model';
import { FeesService } from 'src/app/services/fees.service';
import { EventsService } from 'src/app/services/events.service';
import { FeeCreate, EventCreate } from 'src/app/services/req/event.create';
import Bulma from '@vizuaalog/bulmajs';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import { getTodayString } from 'src/app/helpers/date';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  fees: FeeCreate[];

  createEventForm: FormGroup;
  date: string = "";
  error_date: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fees = [];
    this.createCalendar();
    console.log(this.error_date.length);
  }

  createForm() {
    this.createEventForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      subtitle: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ['', Validators.required],
    })
  }

  onSubmit() {

    let title: string = this.createEventForm.value.title;
    let subtitle: string = this.createEventForm.value.subtitle;
    let description: string = this.createEventForm.value.description;

    var newEvent: EventCreate = new EventCreate(title, subtitle, description, this.fees, this.date);

    this.eventsService.createEvent(newEvent)
      .subscribe(
        data => {
          Bulma.create('notification', {
            body: 'Event created correctly! 🎉',
            color: 'success',
            isDismissable: true,
            parent: document.getElementById('notification'),
          }).show();

          this.reset();
          this.fees = []

          this.router.navigate([`events/${data.id}`]);
          console.log(data);
        },
        error => {
          console.log(error);
        })
  }

  deleteFee(i: number) {
    this.fees.splice(i, 1);
  }

  reset(): void {
    this.fees = [];
    this.createEventForm.clearAsyncValidators();
  }

  getFees() {
    return this.fees;
  }

  addFee(title: string, price: number, description: string) {
    this.fees.push(new FeeCreate(price, title, description))
  }

  createCalendar() {
    // Initialize all input of date type.
    const calendars = bulmaCalendar.attach('[type="date"]', {
      dateFormat: 'YYYY-MM-DD',
      weekStart: 1,
      lang: "en",
      startDate: getTodayString(),
      disabledDates: getTodayString(),
    });

    // Loop on each calendar initialized
    calendars.forEach(calendar => {
      // Add listener to date:selected event
      calendar.on('date:selected', date => {
        console.log(date);
      });
    });

    // To access to bulmaCalendar instance of an element
    var element: any = document.getElementById("calendar_create");

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.date = datepicker.data.value();
        let date: Date = new Date(this.date);
        let today: Date = new Date(getTodayString());
        this.error_date = date < today ? "Not possible date" : ""
      });
    }
  }
}
