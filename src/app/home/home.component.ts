import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GigService } from '../gig.service';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allGigResults: any = [];

  searchResult: string = '';

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

  //Sets search term to show title
  setSearch = (form: NgForm): void => {
    this.searchResult = form.form.value.title;
  };

  //filtering show names
  //"includes" is true/false. Doesnt need a ===
  searchGig = (): any => {
    if (this.searchResult) {
      return this.allGigResults.filter((item: any) => {
        return item.title
          .toLowerCase()
          .includes(this.searchResult.toLowerCase().trim());
      });
    } else {
      return this.allGigResults;
    }
  };
}
