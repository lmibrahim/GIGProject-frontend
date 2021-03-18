import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GigService } from '../gig.service';
import { Show } from '../interfaces/show';

@Component({
  selector: 'app-deets',
  templateUrl: './deets.component.html',
  styleUrls: ['./deets.component.css'],
})
export class DeetsComponent implements OnInit {
  markers: any[] = [];
  show!: Show;
  map!: google.maps.Map;
  center!: google.maps.LatLngLiteral;

  constructor(private route: ActivatedRoute, private gigService: GigService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      console.log(response);
      let id: string | null = response.get('id');
      if (id) {
        this.getAndSetShow(id);
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
        console.log(response);
        this.show = response[0];
        console.log(this.show);
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
        console.log('df');
        console.log(this.markers);
        console.log(this.show.lat);
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
            color: 'red',
            text: 'Marker label ' + (this.markers.length + 1),
          },
          title: 'Marker title ' + (this.markers.length + 1),
          info: 'Marker info ' + (this.markers.length + 1),
          options: { animation: google.maps.Animation.BOUNCE },
        });
        console.log(this.markers);
        console.log(this.show);
      });
    }
    //// VVVVV  BIG OL QUESTION MARK ON THIS PUPPY RIGHT HERE   VVVVV
    else {
      this.gigService.getTheOtherGig(id).subscribe((response: any) => {
        console.log(response);
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
            color: 'red',
            text: 'Marker label ' + (this.markers.length + 1),
          },
          title: 'Marker title ' + (this.markers.length + 1),
          info: 'Marker info ' + (this.markers.length + 1),
          options: { animation: google.maps.Animation.BOUNCE },
        });
      });
      console.log(this.show);
    }
  };
}
// getAndSetMap = (address: string): void => {
//   this.gigService.geoCoding(address).subscribe((response: any) => {
//     console.log(response);
//     this.show.address;
//   });
// };
