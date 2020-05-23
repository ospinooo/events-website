import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Fee } from 'src/app/models/fee.model';
import { FeesService } from 'src/app/services/fees.service';
import { EventsService } from 'src/app/services/events.service';
import { FeeCreate, EventCreate, EventEdit } from 'src/app/services/req/event.create';
import Bulma from '@vizuaalog/bulmajs';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  fees: FeeCreate[];

  createEventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.fees = [];
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

    var newEvent: EventCreate = new EventCreate(title, subtitle, description, this.fees);

    this.eventsService.createEvent(newEvent)
      .subscribe(
        data => {
          Bulma.create('notification', {
            body: 'Event created correctly! 🎉',
            color: 'success',
            isDismissable: true,
            parent: document.getElementById('notification-created'),
          }).show();
          this.reset();
          this.fees = []

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
}
