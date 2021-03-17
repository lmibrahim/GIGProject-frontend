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
  googleURL: string = 'https://maps.googleapis.com/maps/api/geocode/json';

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

  addShow = (show: Show, location: string): any => {
    console.log(show);
    console.log(location);
    let formatted: string;
    formatted = location.replace('\s', '+');
    console.log(formatted);
    console.log(this.geoCoding(formatted));
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

  geoCoding = (address: string): any => {
    console.log('geocoding');
    return this.http.get(this.googleURL, {
      params: {
        address: address,
        key: `AIzaSyCJ_i0zbrUPBpEeYAOVKQqTjeUwZjAtpr0`,
      },
    });
  };
}
