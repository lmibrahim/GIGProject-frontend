import { isNgTemplate } from '@angular/compiler';
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

  searchResultTitle: string = '';
  searchResultType: string = '';
  searchResultDate: string = '';

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
    this.searchResultTitle = form.form.value.title;
    this.searchResultType = form.form.value.showType;
    this.searchResultDate = form.form.value.date;
  };

  //filtering show names
  //"includes" is true/false. Doesnt need a ===
  searchGig = (): any => {
    if (this.searchResultTitle) {
      return this.allGigResults.filter((item: any) => {
        return item.title
          .toLowerCase()
          .includes(this.searchResultTitle.toLowerCase().trim());
      });
    }
    if (this.searchResultType === 'all') {
      return this.allGigResults;
    }
    if (this.searchResultType === 'diy') {
      return this.allGigResults.filter((item: any) => {
        return item.diy;
      });
    }
    if (this.searchResultType === 'public') {
      return this.allGigResults.filter((item: any) => {
        return item.brand_safe;
      });
    }

    // return item.type.includes(diy)
    // }
    // console.log(this.searchResultType);
    // item.diy ? item.diy : item.brand_safe
    if (this.searchResultDate) {
      return this.allGigResults.filter((item: any) => {
        return item.start.includes(this.searchResultDate);
      });
    } else {
      return this.allGigResults;
    }
  };
}
