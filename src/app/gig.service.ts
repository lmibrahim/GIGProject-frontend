import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { secret } from './secrets';
import { Show } from './interfaces/show';

@Injectable({
  providedIn: 'root',
})
export class GigService {
  predictHQEventsURL: string = 'https://api.predicthq.com/v1/events/';
  baseURL: string = 'http://localhost:3000/diyshows';

  constructor(private http: HttpClient) {}

  getGig = (): any => {
    console.log('HI');
    let params: any = {
      category: 'concerts',
      'place.scope': '4990729',
      country: 'US',
      limit: '40',
    };
    return this.http.get(this.predictHQEventsURL, {
      params: params,
      headers: {
        Authorization: secret.authorization,
      },
    });
  };

  getDiyGig = (): any => {
    console.log('whzzzzzzzup');

    return this.http.get(this.baseURL);
  };

  addShow = (show: Show): any => {
    console.log(show);

    return this.http.post(`${this.baseURL}`, show);
  };

  getTheGig = (id: string): any => {
    return this.http.get(`${this.baseURL}/${id}`);
  };

  getTheOtherGig = (id: string): any => {
    let params: any = {
      id: id,
    };
    return this.http.get(`${this.predictHQEventsURL}`, {
      params,
      headers: {
        Authorization: secret.authorization,
      },
    });
  };
  //   getAllGigs = (): any => {
  //     this.getGig();
  //     this.getDiyGig();
  //   };
}
