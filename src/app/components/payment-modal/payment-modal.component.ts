import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event } from "../../models/event.model";
import Bulma from '@vizuaalog/bulmajs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {


  @Input() event: Event;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  step_id: number;
  total: number;
  total_people: number
  fee_tickets: Array<number>;
  assistants: Array<Object>;
  isDocumentationfilled: boolean = false;
  isCheckoutFilled: boolean = false;

  userInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
  }

  updateAssistants() {
    var usernameTickets = document.getElementsByClassName("username-ticket");
    var userIdTickets = document.getElementsByClassName("userid-ticket");

    let i = 0;
    let blank = false;
    while (i < this.total_people && !blank) {
      var username: any = usernameTickets[i];
      var id: any = userIdTickets[i];
      blank = username.value == '' || id.value == '';
      i = i + 1;
    }

    this.isDocumentationfilled = !blank;
  }

  updateCardPayment() {
    let name: any = document.getElementById("checkout-name");
    let cardnumber: any = document.getElementById("checkout-cardnumber");
    let cvv: any = document.getElementById("checkout-cvv");
    let month: any = document.getElementById("checkout-month");
    let year: any = document.getElementById("checkout-year");

    if (name.value != '' && cardnumber.value != '' && cvv.value != '' && month.value != '' && year.value != '') {
      this.isCheckoutFilled = true;
    }

  }

  getTotalPrice(): number {
    return 0;
  }

  getTotalPeople(): number {
    return this.total_people;
  }

  continue() {
    this.step_id += 1;
    if (this.step_id == 3) {
      this.pay();
    }
  }

  back() {
    this.step_id -= 1;
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  pay() {
    Bulma.create('notification', {
      body: `You purchased tickets for ${this.event.title}! 🎉`,
      color: 'success',
      isDismissable: true,
      parent: document.getElementById('notification'),
    }).show();
  }
}
