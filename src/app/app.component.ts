import { Component, OnInit} from '@angular/core';
import icons from 'glyphicons';
import { User } from 'src/app/models/User';
import { Category } from 'src/app/enums/Category';
import { Observable } from 'rxjs';
import { House } from 'src/app/models/House';
import { StarShip } from 'src/app/models/StarShip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  myAccountVisible=true;
  myBookingVisible=false;
  contactVisible=false;
  bookingBoardVisible=false;
  title = 'OneMars Booking';
  activeUser= new User();
  user = new User();
  admin = new User();
  accessAuthorized =false;
  mapUsers = new Map<string,User>();
  mapHouses = new Map<string,House>();
  mapStarships = new Map<string,StarShip>();
  messageAlert="";
  userIsAdmin=false;
  houseA = new House();
  houseB = new House();
  houseC = new House();
  starshipXJ45 = new StarShip();
  starshipH43D = new StarShip();

  ngOnInit() {   
    this._createUser();
    this._createHouse();
    this._createStarShip();
  }

  private _opened: boolean = false;

  private _toggleSidebar() {
    this._opened = !this._opened; 
  }


  private _checkAuthorization($event){
    
    this.accessAuthorized=false;
    
    if(this.mapUsers.get($event.login)==null){
      this.messageAlert="Utilisateur inconnu !";
    }else if($event.password != this.mapUsers.get($event.login).password){
      this.messageAlert="Mot de passe invalide pour cet utilisateur !";
    }else{
      this.accessAuthorized=true;
      this.messageAlert="";
      this.activeUser = this.mapUsers.get($event.login);
      this.userIsAdmin=this.activeUser.category===Category.ADMIN;
    }
  }

  private _maskAllScreen(){
   this. myAccountVisible=false;
   this.myBookingVisible=false;
   this.contactVisible=false;
   this.bookingBoardVisible=false;
  }

  private _createUser(){

    //Utilisateur
    this.user.firstName="BOUE";
    this.user.lastname="Sébastien";
    this.user.login="sboue";
    this.user.category=Category.USER;
    this.user.password="sboue";

    this.mapUsers.set(this.user.login,this.user);

    //Administrateur
    this.admin.firstName="Administrateur";
    this.admin.lastname="Administrator";
    this.admin.login="admin";
    this.admin.category=Category.ADMIN;
    this.admin.password="admin";

    this.mapUsers.set(this.admin.login,this.admin);
  }


  private _createHouse(){

    //Maison A
    this.houseA.idHouse="HA";
    this.houseA.name="Maison A";
    this.houseA.mapBooking.set(1,"000001");
    this.houseA.mapBooking.set(2,"000002");

    this.mapHouses.set(this.houseA.idHouse,this.houseA);

    //Maison B
    this.houseB.idHouse="HB";
    this.houseB.name="Maison B";
    this.houseB.mapBooking.set(7,"000003");
    this.houseB.mapBooking.set(8,"000004");
  
    this.mapHouses.set(this.houseB.idHouse,this.houseB);

    //Maison C
    this.houseC.idHouse="HC";
    this.houseC.name="Maison C";
    this.houseC.mapBooking.set(2,"000005");
    this.houseC.mapBooking.set(3,"000006");
    this.houseC.mapBooking.set(4,"000007");
  
    this.mapHouses.set(this.houseC.idHouse,this.houseB);

  }

  private _createStarShip(){

    //Vaisseau 1
    this.starshipXJ45.idStarShip="XJ45";
    this.starshipXJ45.name="Vaisseau XJ45";

    //Vaisseau 1
    this.starshipH43D.idStarShip="H43D";
    this.starshipH43D.name="Vaisseau H43D";
   
  }

}
