import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ResourceService<T> {
  private readonly APIUrl = environment.APIUrl + this.getResourceUrl();
  constructor(protected httpClient: HttpClient) {}

  abstract getResourceUrl(): string;

  // getList(page: number, count: number): Observable<T[]> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('count', count.toString());

  //   return this.httpClient
  //     .get<T[]>(`/${this.APIUrl}}`)
  //     .pipe(catchError(this.handleError));
  // }

  /**
   * It returns an Observable of type T[] (an array of type T) that is the result of a GET request to
   * the APIUrl
   * @returns An observable of type T[]
   */
  getList(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(this.APIUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * It returns an Observable of type T, which is the type of the object that the service is managing
   * @param {number | string} id - number | string - The id of the object to retrieve.
   * @returns Observable<T>
   */
  get(id: number | string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.APIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * The function takes a resource of type T, makes a POST request to the APIUrl, and returns an
   * Observable of type T
   * @param {T} resource - T - The resource to be created.
   * @returns Observable<T>
   */
  create(resource: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.APIUrl}`, resource)
      .pipe(catchError(this.handleError));
  }

 /**
  * It takes an id and a resource as parameters, and then it makes a PUT request to the API, passing
  * the id and the resource as the body of the request
  * @param {number | string} id - number | string: The id of the resource to update.
  * @param {T} resource - The resource to be updated.
  * @returns Observable<T>
  */
  update(id: number | string, resource: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.APIUrl}/${id}`, resource)
      .pipe(catchError(this.handleError));
  }

  /**
   * It takes an id as a parameter, and then it uses the httpClient.delete() method to delete the
   * resource with the given id
   * @param {number | string} id - number | string - The id of the object to delete.
   * @returns Observable<T>
   */
  delete(id: number | string): Observable<T> {
    return this.httpClient
      .delete<T>(`${this.APIUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

 /**
  * If the HTTP request fails, throw an error with the message 'Something wrong happened'.
  * @param {HttpErrorResponse} error - HttpErrorResponse - The error object that was thrown
  * @returns A function that takes an error as a parameter and returns an observable of type
  * HttpErrorResponse.
  */
  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }
}
