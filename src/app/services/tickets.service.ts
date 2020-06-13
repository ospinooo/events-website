import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { httpOptions } from './http/http.options';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
import { PageableTicket } from './res/ticket.interface';
import { TokenStorageService } from '../auth/token-storage.service';
import { environment } from 'src/environments/environment';


export class FeeTickets {
  feeId: number;
  assistants: Assistant[];

  constructor(feeId: number) {
    this.feeId = feeId;
    this.assistants = [];
  }
}

export class Assistant {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
  }
}


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private ticketsUrl = environment.apiUrl + '/tickets';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getTickets(page: number = 0): Observable<PageableTicket> {
    let url = `${this.ticketsUrl}?page=${page}`;
    console.log(url);
    return this.http.get<PageableTicket>(url);
  }

  buyTickets(id: number, feeList: FeeTickets[]): Observable<FeeTickets[]> {
    let url = `${this.ticketsUrl}?event=${id}`;
    return this.http.post<FeeTickets[]>(url, feeList, httpOptions).pipe(
      tap(_ => this.log(`event updated id=${id}`)),
      catchError(this.handleError<FeeTickets[]>(`updateEvent id=${id}`))
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
