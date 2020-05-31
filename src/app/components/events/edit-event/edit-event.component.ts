import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FeeCreate } from 'src/app/services/req/event.create';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import Bulma from '@vizuaalog/bulmajs';
import { Event } from '../../../models/event.model';
import { Fee } from 'src/app/models/fee.model';
import { FeesService } from 'src/app/services/fees.service';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  @Input() event_model: Event;

  editEventForm: FormGroup;

  id: number;
  toDelete: number[];

  fees: Fee[];

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private feeService: FeesService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.fees = [];
      this.toDelete = [];
      this.getEvent();
    })
  }

  getEvent() {
    this.eventsService.getEvent(this.id)
      .subscribe((event) => {
        this.event_model = event;
        console.log(this.event_model);
        this.editEventForm.setValue({
          title: this.event_model.title,
          subtitle: this.event_model.subtitle,
          description: this.event_model.description
        });
      })
  }

  createForm() {
    this.editEventForm = this.formBuilder.group({
      title: [``, Validators.compose([Validators.required, Validators.minLength(3)])],
      subtitle: [``, Validators.compose([Validators.required, Validators.minLength(3)])],
      description: [``, Validators.required],
    })
  }

  onSubmit(): void {

    this.event_model.title = this.editEventForm.value.title;
    this.event_model.subtitle = this.editEventForm.value.subtitle;
    this.event_model.description = this.editEventForm.value.description;

    this.toDelete.forEach(i => {
      this.feeService.deleteFee(i)
        .subscribe(data => this.event_model.fees.splice(i, 1))
    })

    this.eventsService.updateEvent(this.event_model, this.event_model.id)
      .subscribe(
        data => {
          Bulma.create('notification', {
            body: 'Event updated correctly! 🎉',
            color: 'info',
            isDismissable: true,
            parent: document.getElementById('notification'),
          }).show();

          this.router.navigate([`events/${this.id}`]);
        }
      )
  }

  getFees() {
    return this.event_model === undefined ? [] : this.event_model.fees;
  }

  addFee(title: string, price: number, description: string) {
    this.event_model.fees.push(new Fee(price, title, description))
  }

  deleteFee(i: number) {
    if (this.event_model.fees != undefined) {
      this.toDelete.push(this.event_model.fees[i].id);
    }
    this.event_model.fees.splice(i, 1);
  }

}
