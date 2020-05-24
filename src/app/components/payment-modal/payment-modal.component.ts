import { Component, OnInit, Input } from '@angular/core';
import { Event } from "../../models/event.model";
import Bulma from '@vizuaalog/bulmajs';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {


  @Input() event: Event;

  step_id: number;
  total: number;
  total_people: number
  fee_tickets: Array<number>;

  constructor() {
    this.total_people = 0;
  }

  ngOnInit(): void {
    this.step_id = 0;
    this.total = 0;
    this.fee_tickets = Array<number>(this.event.fees.length).fill(0);
  }

  changeTotalNumber(event: any, fee: any, i: number) {
    this.fee_tickets[i] = +event.target.value;
    this.total_people = this.fee_tickets.reduce((p, c) => p + c);
    console.log(this.total_people);
  }

  getTotalPrice(): number {
    return 0;
  }

  getTotalPeople(): number {
    return this.total_people;
  }

  continue() {
    this.step_id += 1;
  }

  back() {
    this.step_id -= 1;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  pay() {
    Bulma.create('notification', {
      body: 'Welcome to MusicMeets! 🎉',
      color: 'success',
      isDismissable: true,
      parent: document.getElementById('notification'),
    }).show();

  }
}
