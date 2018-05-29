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
  monthStartSelected = 0;
  monthEndSelected = 0;

  @Input()
  tabMonths: any[] = EnumValues.getValues(Month);

  @Output()
  updateBookingBoard = new EventEmitter();


  _showUserComponent() {
    this.updateBookingBoard.emit(null);
  }


  constructor() { }

  ngOnInit() {

    const self = this;
    BookingServices.getHouses().forEach(element => {
      self.tabHouses.push(element);
    });
  }

  updateSelectedHouse(event: House): void {
    this.selectedHouse = event;
  }


  selectMonth(monthSelected) {

    // Si aucun mois selectionné
    if (this.monthStartSelected === 0 && this.monthEndSelected === 0) {
      document.getElementById('monthid-' + monthSelected.id).classList.add('itemMonthsLineSelected');
      this.monthStartSelected = monthSelected.id;

    } else
      // Si mois debut sectionné
      if (this.monthStartSelected !== 0) {
        // Deselectionne tout
        if (this.monthStartSelected === monthSelected.id) {
          this.removeAllSelectedMonths();
        } else if (this.monthEndSelected !== 0) {

          // Deselectionne tout sauf le mois de début
          if (this.monthEndSelected === monthSelected.id) {
            this.removeAllSelectedMonthsNotFirst();
          } else if (monthSelected.id > this.monthStartSelected) {

              if (monthSelected.id < this.monthEndSelected) {
                this.removeAllSelectedMonthsNotFirst();
              }

              this.monthEndSelected = monthSelected.id;
              this.selectMonthPlage();
          } else {
            this.monthStartSelected = monthSelected.id;
            this.selectMonthPlage();
          }
        } else {
          if (monthSelected.id > this.monthStartSelected) {
            this.monthEndSelected = monthSelected.id;
            this.selectMonthPlage();
          }
        }
      }
  }

  selectMonthPlage() {

    for (let index = this.monthStartSelected; index < this.monthEndSelected + 1; index++) {
      document.getElementById('monthid-' + index).classList.add('itemMonthsLineSelected');
    }
  }

  removeAllSelectedMonths() {
    this.monthStartSelected = 0;
    this.monthEndSelected = 0;
    for (let index = 1; index < 13; index++) {
      document.getElementById('monthid-' + index).classList.remove('itemMonthsLineSelected');
    }
  }

  removeAllSelectedMonthsNotFirst() {
    this.monthEndSelected = 0;
    for (let index = 1; index < 13; index++) {
      if (index !== this.monthStartSelected) {
        document.getElementById('monthid-' + index).classList.remove('itemMonthsLineSelected');
      }
    }
  }

  HouseChangeValue(event) {
  }



}
