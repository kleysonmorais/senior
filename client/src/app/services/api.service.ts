import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  constructor(private http: HttpClient) { }

  getItems(version?: string): Observable<any> {
    let options: {}
    if (version) options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept-version': `${version}` }) }
    else options = httpOptions
    return this.http.get(`${apiUrl}/${this.url}`, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getItemPage(page: number): Observable<any> {
    let url = `${apiUrl}/${this.url}?_page=${page}`
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getItemParams(paramKey: string, paramValue: string, version?: string): Observable<any> {
    let options: {}
    if (version) options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accept-version': `${version}` }) }
    else options = httpOptions
    let url = `${apiUrl}/${this.url}?${paramKey}=${paramValue}`
    return this.http.get(url, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getItem(id: string): Observable<any> {
    const url = `${apiUrl}/${this.url}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postItem(data): Observable<any> {
    return this.http.post(`${apiUrl}/${this.url}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateItem(data, id: string): Observable<any> {
    return this.http.put(`${apiUrl}/${this.url}/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  replaceItem(data, id: string): Observable<any> {
    return this.http.patch(`${apiUrl}/${this.url}/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  replacePassword(data, id: string): Observable<any> {
    return this.http.patch(`${apiUrl}/${this.url}/replace-password/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteItem(id: string): Observable<{}> {
    const url = `${apiUrl}/${this.url}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error)
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
