import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../models/User';
import { House } from '../models/House';
import { StarShip } from '../models/StarShip';
import { EventEmitter } from 'events';
import * as BookingServices from 'src/app/services/BookingServices';
import * as UserServices from 'src/app/services/UserServices';
import { Month } from '../enums/Month';
import { EnumValues } from 'enum-values';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Booking } from '../models/Booking';
import { SelectionModel } from '@angular/cdk/collections';
import $ from 'jquery';

const MODE_CREATE = 1;
const MODE_MODIFY = 2;

@Component({
  selector: 'app-booking-component',
  templateUrl: './booking-component.component.html',
  styleUrls: ['./booking-component.component.less']
})



export class BookingComponentComponent implements OnInit {

  tabHouses: House[] = new Array();
  selectedHouse: House;
  monthStartSelectedId = -1;
  monthEndSelectedId = -1;
  monthSelectedId = -1;
  houseSelected = null;
  observableMonthSelectedId = new Subject<number>();
  labelStartPeriode = '';
  labelEndPeriode = '';
  houseVisible = false;
  buttonVisible = true;
  editorBookingVisible = false;
  mapBookingsBySuser = new Map<string, Booking>();
  allItemsSelected = false;
  displayedColumns = ['select', 'startmonth', 'endmonth', 'house', 'starship', 'action'];
  selection = new SelectionModel<Booking>(true, []);
  mode = MODE_CREATE;
  selectedBooking: any;
  

  @Input()
  tabMonths: any[];
  @Input()
  observableTest: Subject<number>;

  @Output()
  validBookingEvent = new EventEmitter();


  _showUserComponent() {

  }


  constructor() { }

  ngOnInit() {

    BookingServices.getHouses().forEach(element => {
      this.tabHouses.push(element);
    });

    this.mapBookingsBySuser = BookingServices.getBookingsByUser(UserServices.getActiveUser().idUser);

    this.observableTest.subscribe(item => {
      console.log(item);
    });

    // Evenement sur choix d'un mois
    this.observableMonthSelectedId.subscribe(item => {
      this.houseVisible = this.monthStartSelectedId !== -1;


      const indexMax = this.monthEndSelectedId === -1 ? 0 : this.monthEndSelectedId;
      const indexMin = this.monthStartSelectedId === -1 ? 0 : this.monthStartSelectedId;

      if (this.monthStartSelectedId !== -1) {
        this.labelStartPeriode = this.tabMonths[indexMin - 1].value;
      } else {
        this.labelStartPeriode = '';
      }

      if (this.monthEndSelectedId !== -1) {
        this.labelEndPeriode = this.tabMonths[indexMax - 1].value;
      } else {
        this.labelEndPeriode = '';
      }

    });

  }

  /**
   * 
   * @param event Methode lors de la selection d'une maison.
   */
  updateSelectedHouse(event: House): void {
    this.selectedHouse = event;
  }

  /**
   * Methode lors de la selection d'un mois.
   * @param month 
   */
  selectMonth(month) {

    this.monthSelectedId = month.id;

    // Si aucun mois selectionné
    if (this.monthStartSelectedId === -1 && this.monthEndSelectedId === -1) {
      document.getElementById('monthid-' + this.monthSelectedId).classList.add('itemMonthsLineSelected');
      this.monthStartSelectedId = this.monthSelectedId;
    } else
      // Si mois debut sectionné
      if (this.monthStartSelectedId !== -1) {
        // Deselectionne tout
        if (this.monthStartSelectedId === this.monthSelectedId) {
          this.removeAllSelectedMonths();
        } else if (this.monthEndSelectedId !== -1) {

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

  /**
   * Selection d'une plage entre deux mois. 
   */
  selectMonthPlage() {

    const indexMax = this.monthEndSelectedId === -1 ? 0 : this.monthEndSelectedId;
    const indexMin = this.monthStartSelectedId === -1 ? 0 : this.monthStartSelectedId;

    for (let index = indexMin; index < indexMax + 1; index++) {
      document.getElementById('monthid-' + index).classList.add('itemMonthsLineSelected');
    }
  }

  /**
   * Deselectionne tous les mois.
   */
  removeAllSelectedMonths() {
    this.monthStartSelectedId = -1;
    this.monthEndSelectedId = -1;
    for (let index = 1; index < 13; index++) {
      document.getElementById('monthid-' + index).classList.remove('itemMonthsLineSelected');
    }

  }

  /**
   * Deselectionne tous les mois sauf le mois de debut.
   */
  removeAllSelectedMonthsNotFirst() {
    this.monthEndSelectedId = -1;
    for (let index = 1; index < 13; index++) {
      if (index !== this.monthStartSelectedId) {
        document.getElementById('monthid-' + index).classList.remove('itemMonthsLineSelected');
      }
    }
  }

  /**
   * Selectionne une maison.
   * @param houseSelected 
   */
  selectHouse(houseSelected) {

    if (this.houseSelected === null) {
      document.getElementById('houseid-' + houseSelected.idHouse).classList.add('itemHouseSelected');
      this.houseSelected = houseSelected;

    } else if (this.houseSelected === houseSelected) {
      document.getElementById('houseid-' + houseSelected.idHouse).classList.remove('itemHouseSelected');
      this.houseSelected = null;

    } else {
      document.getElementById('houseid-' + this.houseSelected.idHouse).classList.remove('itemHouseSelected');
      document.getElementById('houseid-' + houseSelected.idHouse).classList.add('itemHouseSelected');
      this.houseSelected = houseSelected;

    }

  }

  /**
   * Validation de la réservation
   */
  validBooking() {

    const newBooking: Booking = new Booking();

    // ajout des mois et de la maison
    newBooking.startMonth = this.tabMonths[this.monthStartSelectedId - 1];
    if (this.monthEndSelectedId === -1) {
      newBooking.endMonth = this.tabMonths[this.monthStartSelectedId - 1];
    } else {
      newBooking.endMonth = this.tabMonths[this.monthEndSelectedId - 1];
    }

    newBooking.idHouse = this.houseSelected.idHouse;
    newBooking.idUser = UserServices.getActiveUser().idUser;
    
    let codeRet = 0;
    if (this.mode === MODE_CREATE) {
       codeRet = BookingServices.createBooking(newBooking);
    } else {
       codeRet = BookingServices.updateBooking(newBooking);
    }

    this.mapBookingsBySuser = BookingServices.getBookingsByUser(UserServices.getActiveUser().idUser);

    this.reinit();

  }

  reinit() {
    this.editorBookingVisible = false;
    this.monthStartSelectedId = -1;
    this.monthEndSelectedId = -1;
    this.monthSelectedId = -1;
    this.houseVisible = false;
  }
  /**
  * Annulation de la réservation en cours de saisie
  */
  cancelBooking() {
    this.reinit();
  }

  addBooking() {
    this.mode = MODE_CREATE;
    this.editorBookingVisible = true;
  }

  selectAll() {

  }

  selectBooking() {

  }

  getMapBookingsBySuser() {
    return Array.from(this.mapBookingsBySuser.values());
  }

  getStartMonth(element) {
    return element.startMonth.value;
  }

  getEndMonth(element) {
    return element.endMonth.value;
  }
  getHouse(element) {
    return BookingServices.getHouseById(element.idHouse).name;
  }
  getStarShip(element) {
    if (element.idStarShip != null) {
      return BookingServices.getStarShipById(element.idStarShip).name;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.mapBookingsBySuser.size;
    return numSelected === numRows;
  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.mapBookingsBySuser.forEach(row => this.selection.select(row));
  }

  deleteBooking(element) {
    BookingServices.deleteBooking(element.idBooking);
    this.mapBookingsBySuser = BookingServices.getBookingsByUser(UserServices.getActiveUser().idUser);
  }

  modifyBooking(element) {

    this.editorBookingVisible = true;
    this.mode = MODE_MODIFY;
    this.selectedBooking = element;
    
  }

  updateBookingEditor(){
    if(this.mode === MODE_MODIFY){
      this.selectMonth(this.tabMonths[this.selectedBooking.startMonth.id - 1]);
      this.selectMonth(this.tabMonths[this.selectedBooking.endMonth.id - 1]);
      this.houseSelected(BookingServices.getHouseById(this.selectedBooking.idHouse));
    }
  }

  showHouses(){
    return this.houseVisible || this.mode === MODE_MODIFY;
  }
}
