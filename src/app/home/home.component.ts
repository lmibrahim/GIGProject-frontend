import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GigService } from '../gig.service';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allGigResults: any = [];
  filteredResults: any = [];

  searchResultTitle: string = '';
  searchResultType: string = '';
  searchResultDate: string = '';

  constructor(private gigService: GigService, private router: Router) {}

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

  filterSearch = (): any => {
    if (this.searchResultTitle) {
      return this.allGigResults.filter((item: any) => {
        return item.title
          .toLowerCase()
          .includes(this.searchResultTitle.toLowerCase().trim());
      });
    } else {
      return this.allGigResults;
    }
  };

  filterType = (): any => {
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
    } else {
      return this.allGigResults;
    }
  };

  filterDate = (): any => {
    if (this.searchResultDate) {
      return this.allGigResults.filter((item: any) => {
        return item.start.includes(this.searchResultDate);
      });
    } else {
      return this.allGigResults;
    }
  };

  updateSearch = () => {
    this.filteredResults = this.filterSearch();
    return this.filteredResults;
  };

  updateType = () => {
    this.filteredResults = this.filterType();
    return this.filteredResults;
  };

  updateDate = () => {
    this.filteredResults = this.filterDate();
    return this.filteredResults;
  };

  //compares two arrays and only returns the matching result(s)
  updatedResults = () => {
    //taking in full array
    let results = this.allGigResults;
    if (this.searchResultTitle) {
      //getting the filtered array and comparing it to the full arrray and returning matching objects (the filtered array comes from the updateSearch method)
      results = results.filter((result: any) => {
        return this.updateSearch().includes(result);
      });
    }
    //getting the filtered array and comparing it to the full arrray and returning matching objects (the filtered array comes from the filter method used)
    //if any previous filters went through then youre no longer going through the full array you are going through the previous filtered array (in this case the one that has the matching titles if that filter was ran)
    if (this.searchResultType) {
      results = results.filter((result: any) => {
        return this.updateType().includes(result);
      });
    }
    if (this.searchResultDate) {
      results = results.filter((result: any) => {
        return this.updateDate().includes(result);
      });
    }
    //if none of the filters run then it will return the original full array (allGigResults)
    return results;
  };
}
