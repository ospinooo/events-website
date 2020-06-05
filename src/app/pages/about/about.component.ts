import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  phrases = [
    "Without music, life would be a mistake",
    "It's more than just Music. I feel Alive, I feel At Home",
    "Good Music doesn't have an expiration date",
    "A day without Music... Just Kidding I have no idea what that's like.",
    "Meeting you was like listening to a song for the first time",
    "Music can change the world",
    "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.",
    "Music is a language that doesn't speak in particular words. It speaks in emotions, and if it's in the bones, it's in the bones."
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
