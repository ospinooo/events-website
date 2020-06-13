import { Injectable } from '@angular/core';
import { Fee } from '../models/fee.model';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { httpOptions } from './http/http.options';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../auth/token-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  private feesUrl = environment.apiUrl + '/fees';

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  /** DELETE: delete the fee from the server */
  deleteFee(fee: Fee | number): Observable<Fee> {
    const id = typeof fee === 'number' ? fee : fee.id;
    const url = `${this.feesUrl}/${id}`;
    return this.http.delete<Fee>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted fee id=${id}`)),
      catchError(this.handleError<Fee>('deleteFee'))
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

  /** Log a FeeService message with the MessageService */
  private log(message: string) {
    console.log('FeeService: ' + message);
  }
}
