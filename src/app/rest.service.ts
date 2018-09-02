import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }


  getHotels(): Observable<any> {
    return this.http.get(endpoint + 'hotels').pipe(
      map(this.extractData));
  }

  searchHotels(hotel): Observable<any> {
    console.log(hotel);
    return this.http.post<any>(endpoint + 'hotels', JSON.stringify(hotel), httpOptions).pipe(
      tap((product) => console.log('get hotel w/ id=${hotel.id}')),
      catchError(this.handleError<any>('getHotel'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}


