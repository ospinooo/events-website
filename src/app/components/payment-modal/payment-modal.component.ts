import { Component, OnInit } from '@angular/core';
import { Event } from "../../models/event.model";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {


  event: Event;
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
    // this.fee_tickets = new Array<>(this.event.fees.size();
  }

  changeTotalNumber(event: any, fee: any) {
    this.total_people = +event.target.value;
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

  arrayOne(n: number): any[] {
    return Array(n);
  }
}
