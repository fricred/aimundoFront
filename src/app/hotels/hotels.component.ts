import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotels: any = [];
  hotelSearch = { name: "", stars: [] };
  isCollapsed = false;
  isCollapsedStar = false;
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getHotels();
  }


  getHotels() {
    this.hotels = [];
    this.rest.getHotels().subscribe((data: {}) => {
      console.log(data);
      this.hotels = data;
    });
  }

  getStars(number) {
    var stars = [];
    for (var i = 0; i < number; i++) {
      stars.push(i);
    }
    return stars;
  }

  onNameSearch(name: string) {
    console.log(name);
    this.hotelSearch.name = name;
    this.buscar();
  }

  onFilterChange(index) {
    switch (index) {
      case 0:
        this.hotelSearch.stars = [];
        break;
      default:
        if (this.hotelSearch.stars.includes(index)) {
          var indexObj = this.hotelSearch.stars.indexOf(index, 0);
          if (indexObj > -1) {
            this.hotelSearch.stars.splice(indexObj, 1);
          }
        } else {
          this.hotelSearch.stars.push(index);
        }
        break;
    }
    console.log(this.hotelSearch.stars);
    this.buscar();
  }

  buscar() {
    if (this.hotelSearch.name == "" && this.hotelSearch.stars.length == 0) {
      this.getHotels();
    } else {
      this.rest.searchHotels(this.hotelSearch).subscribe((data: {}) => {
        console.log(data);
        this.hotels = data;
      });
    }
  }

  showHideSearchForm(){
    console.log($)
  }

}
