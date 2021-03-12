import { Component, OnInit } from '@angular/core';
import { GigService } from '../gig.service';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gigResults: any = [];
  diyGigResults: any = [];
  allGigResults: any = [];

  constructor(private gigService: GigService) {}

  ngOnInit(): void {
    console.log('WORKIN');
    this.getAndSetGig();
    this.getAndSetDiyGig();
  }

  getAndSetGig = () => {
    console.log('hear ya');
    this.gigService.getGig().subscribe((response: any) => {
      this.allGigResults = this.allGigResults.concat(response.results);
      console.log(this.allGigResults);
    });
  };

  getAndSetDiyGig = () => {
    this.gigService.getDiyGig().subscribe((response: any) => {
      this.allGigResults = this.allGigResults.concat(response);
      console.log(this.allGigResults);
    });
  };
  // getAndSetAllGigs = ():any => {
  //   this.allGigResults.push(this.gigResults);
  //   this.allGigResults.push(this.diyGigResults);
  //   console.log(this.allGigResults);
  // };

  // getAndSetAllGigs()
}
