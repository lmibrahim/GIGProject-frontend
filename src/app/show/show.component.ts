import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  // allows us to get information from the parent component (home)
  @Input() allGigResultsRef!: Show;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showDetails = (id: number) => {
    this.router.navigate([`/deets/${id}`]);
  };
}
