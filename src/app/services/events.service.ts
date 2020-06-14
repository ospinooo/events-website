import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PageableEvent } from './res/events.interface';
import { EventCreate } from './req/event.create';
import { TokenStorageService } from '../auth/token-storage.service';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  private eventsUrl = environment.apiUrl + '/events';


  /** GET events from the server */
  getEvents(page: number = 0, descAscActive: string = "asc", sortActive: string = "title"): Observable<PageableEvent> {

    let url = `${this.eventsUrl}?page=${page}&dir=${descAscActive}&sort=${sortActive}`
    console.log(url)
    return this.http.get<PageableEvent>(url);
  }

  /** GET event by id. Will 404 if id not found */
  getEvent(id: number): Observable<Event> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get<Event>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched event id=${id}`)),
      catchError(this.handleError<Event>(`getEvent id=${id}`))
    );
  }

  getEventsByTitle(title: string): Observable<PageableEvent> {
    const url = `${this.eventsUrl}?search=${title}`
    return this.http.get<PageableEvent>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched event id=${title}`)),
      catchError(this.handleError<PageableEvent>(`getEvent id=${title}`))
    );
  }

  getEventsByDate(page: number = 0, date_init: string, date_end: string): Observable<PageableEvent> {
    const url = `${this.eventsUrl}?date_init=${date_init}&date_end=${date_end}&page=${page}`;
    return this.http.get<PageableEvent>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched event date=${date_init}&date_end=${date_end}`)),
      catchError(this.handleError<PageableEvent>(`getEvent date=${date_init}&date_end=${date_end}`))
    );
  }


  updateEvent(event: Event, id: number): Observable<Event> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.put<Event>(url, event, httpOptions).pipe(
      tap(_ => this.log(`event updated id=${id}`)),
      catchError(this.handleError<Event>(`updateEvent id=${id}`))
    );
  }

  /** POST Event */
  createEvent(event: EventCreate): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event, httpOptions).pipe(
      tap(_ => this.log(`event created`)),
      catchError(this.handleError<Event>(`Error event create`))
    );
  }

  /** DELETE: delete the event from the server */
  deleteEvent(event: Event | number): Observable<Event> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.eventsUrl}/${id}`;
    return this.http.delete<Event>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted event id=${id}`)),
      catchError(this.handleError<Event>('deleteEvent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      if (error.status == 401) {
        this.tokenStorageService.signOut();
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EventService message with the MessageService */
  private log(message: string) {
    console.log('EventService: ' + message);
  }
}
