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
    let newShow: Show = form.form.value;
    // newShow.location = [0, 0];
    this.gigService.geoCoding(form.form.value.address).subscribe((response:any)=>{
      console.log(response);
      console.log(response.results[0].geometry.location.lat);
      console.log(response.results[0].geometry.location.lng)
      
    })
    // this.gigService
    //   .addShow(newShow, form.form.value.address)
    //   .subscribe((response: any) => {
    //     // form.reset();
    //   });
  };
}
