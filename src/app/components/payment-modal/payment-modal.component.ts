import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event } from "../../models/event.model";
import Bulma from '@vizuaalog/bulmajs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketsService, FeeTickets, Assistant } from 'src/app/services/tickets.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

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
  fee_assistants: Array<FeeTickets> = [];
  fee_tickets: Array<number>;
  assistants: Array<Object>;
  isDocumentationfilled: boolean = false;
  isCheckoutFilled: boolean = false;

  userInfoForm: FormGroup;

  usernameTickets: HTMLCollectionOf<Element>;
  userIdTickets: HTMLCollectionOf<Element>;

  points: number;
  error_points: string;

  constructor(
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private userService: UserService,
    public tokenService: TokenStorageService) {
    this.total_people = 0;
  }

  ngOnInit(): void {
    this.step_id = 0;
    this.total = 0;
    this.fee_tickets = Array<number>(this.event.fees.length).fill(0);
    this.userService.getUserData(this.tokenService.getUsername()).subscribe(data => {
      this.points = data.points;
    })
  }

  changeTotalNumber(event: any, fee: any, i: number) {
    this.fee_tickets[i] = +event.target.value;
    this.total_people = this.fee_tickets.reduce((p, c) => p + c);
  }

  updateAssistants() {
    this.fee_assistants = [];
    this.event.fees.forEach(fee => this.fee_assistants.push(new FeeTickets(fee.id)));
    this.usernameTickets = document.getElementsByClassName("username-ticket");
    this.userIdTickets = document.getElementsByClassName("userid-ticket");

    let count = 0;
    let iFee = 0;
    let i = 0;
    let blank = false;

    while (i < this.total_people && !blank) {
      var username: any = this.usernameTickets[i];
      var id: any = this.userIdTickets[i];


      // until we find next fee with tickets
      while (count == this.fee_tickets[iFee]) {
        iFee += 1;
        count = 0;
      }

      this.fee_assistants[iFee].assistants.push(new Assistant(username.value, id.value));

      count += 1;
      blank = username.value == '' || id.value == '';
      i = i + 1;
    }

    this.isDocumentationfilled = !blank;
  }

  updateCardPayment() {
    let name: any = document.getElementById("checkout-name");

    if (name.value == this.tokenService.getUsername()) {
      this.isCheckoutFilled = true;
    } else {
      this.isCheckoutFilled = false;
    }

    this.error_points = this.points < this.getTotalPrice() ? "Not enough poins" : "";
  }

  getTotalPrice(): number {
    let total = 0;
    this.fee_tickets.forEach((n, i) => {
      total += n * this.event.fees[i].price;
    })
    return total;
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
    this.ticketsService.buyTickets(this.event.id, this.fee_assistants)
      .subscribe(data => {
        console.log(data);
        Bulma.create('notification', {
          body: `You purchased tickets for ${this.event.title}! 🎉`,
          color: 'success',
          isDismissable: true,
          parent: document.getElementById('notification'),
        }).show();
      }, error => {
        console.log(error);
      })
  }

  getPoints() {
    return this.points;
  }
}
