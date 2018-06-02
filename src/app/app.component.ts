import { Component, OnInit} from '@angular/core';
import icons from 'glyphicons';
import { User } from 'src/app/models/User';
import { Category } from 'src/app/enums/Category';
import { Observable, Subject } from 'rxjs';
import { House } from 'src/app/models/House';
import { StarShip } from 'src/app/models/StarShip';
import * as UserServices from 'src/app/services/UserServices';
import * as BookingServices from 'src/app/services/BookingServices';
import { EnumValues } from 'enum-values';
import { Month } from './enums/Month';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  myAccountVisible = true;
  myBookingVisible = false;
  contactVisible = false;
  bookingBoardVisible = false;
  title = 'OneMars Booking';
  activeUser = new User();
  accessAuthorized = false;
  messageAlert = '';
  userIsAdmin = false;
  _opened: Boolean = false;
// tabMonths: any [] =  EnumValues.getValues(Month);

  tabMonths: any [] = new Array({id: 1, value: 'Janvier'},
                               {id: 2, value: 'Février'},
                               {id: 3, value: 'Mars'},
                               {id: 4, value: 'Avril'},
                               {id: 5, value: 'Mai'},
                               {id: 6, value: 'Juin'},
                               {id: 7, value: 'Juillet'},
                               {id: 8, value: 'Aout'},
                               {id: 9, value: 'Septembre'},
                               {id: 10, value: 'Octobre'},
                               {id: 11, value: 'Novembre'},
                               {id: 12, value: 'Décembre'});

observableTest = new Subject<number>();

  ngOnInit() {
    UserServices.initUsers();
    BookingServices.initRessources();
  }


   _toggleSidebar() {
    this._opened = !this._opened;
  }


   _checkAuthorization($event) {

    this.accessAuthorized = false;
    this.messageAlert = UserServices.checkAuthorization($event);

    if (this.messageAlert === '') {
      this.accessAuthorized = true;
        this.activeUser = UserServices.getUserInfo($event.login);
        this.userIsAdmin = this.activeUser.category === Category.ADMIN;
        this._opened = true;
    }

  }

   _maskAllScreen() {
   this. myAccountVisible = false;
   this.myBookingVisible = false;
   this.contactVisible = false;
   this.bookingBoardVisible = false;
  }

  testFunction(){
    this.observableTest.next(22222);
  }
}
