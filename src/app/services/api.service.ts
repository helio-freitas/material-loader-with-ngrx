import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private APIGetBreed = 'https://api.thecatapi.com/v1/breeds';
  constructor(private http: HttpClient) {}

  getBreeds() {
    let headers = new HttpHeaders();
    headers = headers.append(
      'x-api-key',
      'b3ca5fbc-146f-4956-850c-f01fada1204d'
    );
    return (
      this.http
        .get(this.APIGetBreed, {
          headers: headers
        })
        /**
         * this delay is just to simulate a "slow-connection" scenario. Should be removed
         */
        .pipe(delay(4000))
    );
  }
}
