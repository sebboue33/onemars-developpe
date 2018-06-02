import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../models/User';
import { House } from '../models/House';
import { StarShip } from '../models/StarShip';
import { EventEmitter } from 'events';
import * as BookingServices from 'src/app/services/BookingServices';
import { Month } from '../enums/Month';
import { EnumValues } from 'enum-values';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-booking-component',
  templateUrl: './booking-component.component.html',
  styleUrls: ['./booking-component.component.less']
})
export class BookingComponentComponent implements OnInit {

  tabHouses: House[] = new Array();
  selectedHouse: House;
  monthStartSelectedId = 0;
  monthEndSelectedId = 0;
  monthSelectedId = 0;
  houseSelected = null;
  observableMonthSelectedId = new Subject<number>();
  labelStartPeriode = '';
  labelEndPeriode = '';
  houseVisible = false;
  buttonVisible = false;

  @Input()
  tabMonths: any[] ;
  @Input()
  observableTest: Subject<number>;

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

    this.observableTest.subscribe(item => {
      alert(item);
    });

    // Evenement sur choix d'un mois
    this.observableMonthSelectedId.subscribe(item => {
      this.houseVisible = this.monthStartSelectedId !== 0;

      if (this.monthStartSelectedId !== 0) {
        this.labelStartPeriode = this.tabMonths[this.monthStartSelectedId - 1].value;
      } else {
        this.labelStartPeriode = '';
      }

      if (this.monthEndSelectedId !== 0) {
        this.labelEndPeriode = this.tabMonths[this.monthEndSelectedId - 1].value;
      } else {
        this.labelEndPeriode = '';
      }

    });

  }

  updateSelectedHouse(event: House): void {
    this.selectedHouse = event;
  }


  selectMonth(month) {

this.monthSelectedId = month.id;

    // Si aucun mois selectionné
    if (this.monthStartSelectedId === 0 && this.monthEndSelectedId === 0) {
      document.getElementById('monthid-' + this.monthSelectedId ).classList.add('itemMonthsLineSelected');
      this.monthStartSelectedId = this.monthSelectedId;
    } else
      // Si mois debut sectionné
      if (this.monthStartSelectedId !== 0) {
        // Deselectionne tout
        if (this.monthStartSelectedId === this.monthSelectedId) {
          this.removeAllSelectedMonths();
        } else if (this.monthEndSelectedId !== 0) {

          // Deselectionne tout sauf le mois de début
          if (this.monthEndSelectedId === this.monthSelectedId) {
            this.removeAllSelectedMonthsNotFirst();
          } else if (this.monthSelectedId > this.monthStartSelectedId) {

            if (this.monthSelectedId < this.monthEndSelectedId) {
              this.removeAllSelectedMonthsNotFirst();
            }

            this.monthEndSelectedId = this.monthSelectedId;
            this.selectMonthPlage();
          } else {
            this.monthStartSelectedId = this.monthSelectedId;
            this.selectMonthPlage();
          }
        } else {
          if (this.monthSelectedId > this.monthStartSelectedId) {
            this.monthEndSelectedId = this.monthSelectedId;
            this.selectMonthPlage();
          }
        }
      }

      this.observableMonthSelectedId.next(this.monthSelectedId);
  }

  selectMonthPlage() {

    for (let index = this.monthStartSelectedId; index < this.monthEndSelectedId + 1; index++) {
      document.getElementById('monthid-' + index).classList.add('itemMonthsLineSelected');
    }
  }

  removeAllSelectedMonths() {
    this.monthStartSelectedId = 0;
    this.monthEndSelectedId = 0;
    for (let index = 1; index < 13; index++) {
      document.getElementById('monthid-' + index).classList.remove('itemMonthsLineSelected');
    }

    this.buttonVisible = false;
  }

  removeAllSelectedMonthsNotFirst() {
    this.monthEndSelectedId = 0;
    for (let index = 1; index < 13; index++) {
      if (index !== this.monthStartSelectedId) {
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
