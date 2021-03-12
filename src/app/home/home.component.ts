import { Component, OnInit } from '@angular/core';
import { GigService } from '../gig.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gigResults: any[] = [];

  constructor(private gigService: GigService) {}

  ngOnInit(): void {
    console.log('WORKIN');
    this.getAndSetGig();
  }

  getAndSetGig = () => {
    console.log('hear ya');
    this.gigService.getGig().subscribe((response: any) => {
      console.log(response);
      this.gigResults = response;
    });
  };
}
