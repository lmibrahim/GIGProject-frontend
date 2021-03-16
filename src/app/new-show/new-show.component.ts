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
    this.gigService.addShow(newShow).subscribe((response: any) => {
      // form.reset();
    });
  };
}
