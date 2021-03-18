import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GigService } from '../gig.service';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-new-show',
  templateUrl: './new-show.component.html',
  styleUrls: ['./new-show.component.css'],
})
export class NewShowComponent implements OnInit {
  constructor(
    private gigService: GigService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit = (form: NgForm): void => {
    console.log('NEW SHOW??');
    console.log(form);
    let newShow: Show = {
      id: form.form.value.id,
      title: form.form.value.title,
      start: form.form.value.start,
      description: form.form.value.description,
      address: form.form.value.address,
      lat: 0,
      lng: 0,
    };

    this.gigService
      .geoCoding(form.form.value.address)
      .subscribe((response: any) => {
        //we need to add lat and long response to newShow
        console.log(response);
        newShow.lat = response.results[0].geometry.location.lat;
        newShow.lng = response.results[0].geometry.location.lng;
        this.gigService.addShow(newShow).subscribe((response: any) => {
          return response;
          form.reset();
        });
      });
  };
}
