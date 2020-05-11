import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  id: number;
  private sub: any;

  firstname: string;
  lastname: string;
  email: string;
  telephone: string;


  constructor(private route: ActivatedRoute, private contactService: EventsService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // this.getContact()
    })
  }

  getContact() {
    // this.contactService.getContact(this.id).subscribe((contact) => {
    //   this.id = contact.id;
    //   this.firstname = contact.firstname;
    //   this.lastname = contact.lastname;
    //   this.email = contact.email;
    //   this.telephone = contact.telephone;
    // })
  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
