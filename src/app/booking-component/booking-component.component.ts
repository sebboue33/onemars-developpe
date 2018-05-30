import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../models/User';
import { House } from '../models/House';
import { StarShip } from '../models/StarShip';
import { EventEmitter } from 'events';
import * as BookingServices from 'src/app/services/BookingServices';
import { Month } from '../enums/Month';
import { EnumValues } from 'enum-values';
import { Observable, BehaviorSubject } from 'rxjs';

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
  houseSelected = null;
  observablePeriode = new BehaviorSubject<number>(0);
  observableMonthStart = new BehaviorSubject<number>(0);
  observableMonthEnd = new BehaviorSubject<number>(0);
  labelStartPeriode = '';
  labelEndPeriode = '';
  houseVisible = false;
  buttonVisible = false;

  @Input()
  tabMonths: any[] ;

  @Output()
  updateBookingBoard = new EventEmitter();


  _showUserComponent() {
    this.updateBookingBoard.emit(null);
  }


  constructor() { }

  ngOnInit() {

    BookingServices.getHouses().forEach(element => {
      this.tabHouses.push(element);
    });

    // Evenement sur choix d'un mois
    this.observablePeriode.subscribe(item => {
      this.houseVisible = this.monthStartSelected !== 0;

      if (this.monthStartSelected !== 0) {
        this.labelStartPeriode = this.tabMonths[this.monthStartSelected - 1].value;
      } else {
        this.labelStartPeriode = '';
      }

      if (this.monthEndSelected !== 0) {
        this.labelEndPeriode = this.tabMonths[this.monthEndSelected - 1].value;
      } else {
        this.labelEndPeriode = '';
      }

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

    this.observablePeriode.next(monthSelected);
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

    this.buttonVisible = false;
  }

  removeAllSelectedMonthsNotFirst() {
    this.monthEndSelected = 0;
    for (let index = 1; index < 13; index++) {
      if (index !== this.monthStartSelected) {
        document.getElementById('monthid-' + index).classList.remove('itemMonthsLineSelected');
      }
    }
  }

  selectHouse(houseSelected) {

    if (this.houseSelected  === null){
      document.getElementById('houseid-' + houseSelected.idHouse).classList.add('itemHouseSelected');
      this.houseSelected = houseSelected;
      this.buttonVisible = true;
    } else if (this.houseSelected === houseSelected ) {
      document.getElementById('houseid-' + houseSelected.idHouse).classList.remove('itemHouseSelected');
      this.houseSelected = null;
      this.buttonVisible = false;
    } else {
      document.getElementById('houseid-' + this.houseSelected.idHouse).classList.remove('itemHouseSelected');
      document.getElementById('houseid-' + houseSelected.idHouse).classList.add('itemHouseSelected');
      this.houseSelected = houseSelected;
      this.buttonVisible = true;
    }

  }



}
