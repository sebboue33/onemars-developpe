import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../models/User';
import { House } from '../models/House';
import { StarShip } from '../models/StarShip';
import { EventEmitter } from 'events';
import * as BookingServices from 'src/app/services/BookingServices';
import { Month } from '../enums/Month';
import { EnumValues } from 'enum-values';

@Component({
  selector: 'app-booking-component',
  templateUrl: './booking-component.component.html',
  styleUrls: ['./booking-component.component.less']
})
export class BookingComponentComponent implements OnInit {

  tabHouses: House[] = new Array();
  selectedHouse: House;

  @Input()
  tabMonths: any [] =  EnumValues.getValues(Month);

  tabStartMonth: any[] = new Array();
  tabEndMonth: any[] = new Array();

  @Output()
  updateBookingBoard = new EventEmitter();


   _showUserComponent(){
    this.updateBookingBoard.emit(null);
  }


  constructor() { }

  ngOnInit() {
    this.tabStartMonth = this.tabMonths.slice();
    this.tabEndMonth = this.tabMonths.slice();

    const self = this;
    BookingServices.getHouses().forEach(element => {
      self.tabHouses.push(element);
    });
  }

  updateSelectedHouse(event: House): void {
    this.selectedHouse = event;
  }

  MonthStartChangeValue(event) {
    this.tabEndMonth = this.tabMonths.slice(0);
    const tabIndex: number[] = new Array();
    for (let index = 0; index < this.tabEndMonth.length; index++) {
      if(index  < event.currentTarget.selectedIndex) {
        tabIndex.push(index);
      }
    }

    for (let index = 0; index < tabIndex.length; index++) {
      this.tabEndMonth.splice(tabIndex[index], 1);
    }

  }

  MonthEndChangeValue(event) {
    this.tabStartMonth = this.tabMonths.slice(0);
    const tabIndex: number[] = new Array();
    for (let index = 0; index < this.tabStartMonth.length; index++) {
      if(index > event.currentTarget.selectedIndex  ) {
        tabIndex.push(index);
      }
    }

    for (let index = 0; index < tabIndex.length; index++) {
      this.tabStartMonth.splice(tabIndex[index], 1);
    }
  }


  HouseChangeValue(event) {
  }

}
