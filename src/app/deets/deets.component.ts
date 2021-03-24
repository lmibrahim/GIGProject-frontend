import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GigService } from '../gig.service';
import { Post } from '../interfaces/post';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-deets',
  templateUrl: './deets.component.html',
  styleUrls: ['./deets.component.css'],
})
export class DeetsComponent implements OnInit {
  // @Output() requestEvent= new EventEmitter<boolean>();

  markers: any[] = [];
  posts: Post[] = [];
  show!: Show;
  map!: google.maps.Map;
  center!: google.maps.LatLngLiteral;
  url: string = '';

  constructor(private route: ActivatedRoute, private gigService: GigService) {}

  ngOnInit(): void {
    this.route.url.subscribe((response) => {
      console.log(response[0].path);
      this.url = response[0].path;
    });

    this.route.paramMap.subscribe((response) => {
      let id: string | null = response.get('id');
      if (id) {
        this.getAndSetShow(id);
        this.getAndSetPosts(id);
      }
      //   console.log(this.show);
      // if (this.show.address) {
      //   this.gigService
      //     .geoCoding(this.show.address)
      //     .subscribe((response: any) => {
      //       console.log(response);
      //       this.show.address;
      //     });
      // }
      // else if (this.show.entities[0].formatted_address) {
      //   console.log();
      // }
    });
  }

  getAndSetShow = (id: string): void => {
    if (id.length <= 3) {
      this.gigService.getTheGig(id).subscribe((response: any) => {
        this.show = response[0];

        // if (this.show.address) {
        //   this.gigService
        //     .geoCoding(this.show.address)
        //     .subscribe((response: any) => {
        //       console.log(response);
        //       this.show.address;
        //     });
        // }
        // else if (this.show.entities[0].formatted_address) {
        //   console.log();
        // }

        let num1: number = this.show.lat!;
        let num2: number = this.show.lng!;
        this.center = {
          lat: num1,
          lng: num2,
        };
        this.markers.push({
          position: {
            lat: this.show.lat,
            lng: this.show.lng,
          },
          label: {
            color: 'orange',
            text: this.show.title,
          },
          title: 'Marker title ' + (this.markers.length + 1),
          info: 'Marker info ' + (this.markers.length + 1),
          options: { animation: google.maps.Animation.BOUNCE },
        });
      });
    } else {
      this.gigService.getTheOtherGig(id).subscribe((response: any) => {
        this.show = response.results[0];
        let num1: number = this.show.location?.[1]!;
        let num2: number = this.show.location?.[0]!;
        this.center = {
          lat: num1,
          lng: num2,
        };
        this.markers.push({
          position: {
            lat: this.show.location?.[1],
            lng: this.show.location?.[0],
          },
          label: {
            color: 'orange',
            text: 'Marker label ' + (this.markers.length + 1),
          },
          title: this.show.title,
          info: 'Marker info ' + (this.markers.length + 1),
          options: { animation: google.maps.Animation.BOUNCE },
        });
      });
    }
  };

  showDetails = (id: number) => {
    console.log('changing false to true');
    // this.show.display= !this.show.display
    this.gigService.updateShow(id).subscribe((response: any) => {
      console.log(response);
      location.reload();
    });
  };

  getAndSetPosts = (id: string) => {
    this.gigService.getPostsById(parseInt(id)).subscribe((response: any) => {
      this.posts = response;
    });
  };
}
