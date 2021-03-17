import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GigService } from '../gig.service';
import { Show } from '../interfaces/show';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-deets',
  templateUrl: './deets.component.html',
  styleUrls: ['./deets.component.css'],
})
export class DeetsComponent implements OnInit {
  show!: Show;
  constructor(private route: ActivatedRoute, private gigService: GigService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      console.log(response);
      let id: string | null = response.get('id');
      if (id) {
        this.getAndSetShow(id);
      }
    });
  }

  getAndSetShow = (id: string): void => {
    this.gigService.getTheGig(id).subscribe((response: any) => {
      console.log(response);
      this.show = response[0];
    });
    if (!this.show || this.show.title.match('')) {
      this.gigService.getTheOtherGig(id).subscribe((response: any) => {
        console.log(response);
        this.show = response.results[0];
      });
    }
  };
}
