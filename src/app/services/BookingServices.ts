import { ROUTES } from './Router';
import { House } from '../models/House';
import { StarShip } from '../models/StarShip';

const mapHouses = new Map<string, House>();
const mapStarships = new Map<string, StarShip>();
const houseA = new House();
const houseB = new House();
const houseC = new House();
const starshipXJ45 = new StarShip();
const starshipH43D = new StarShip();

export function createBooking( booking) {
}

export function updateBooking( booking) {
}

export function deleteBooking( booking) {
}

export function getBookingByUSer( userId) {
}

export function getAllBooking( ) {
}

export function initRessources() {
    createHouse();
    createStarShip();


}

export  function getHouses(): Map<string, House> {
    return mapHouses;
}

export function getStarShips() {
    return mapStarships;
}

function createHouse() {

    //Maison A
    houseA.idHouse = 'HA';
    houseA.name = 'Maison A';

    mapHouses.set(houseA.idHouse, houseA);

    //Maison B
    houseB.idHouse = 'HB';
    houseB.name = 'Maison B';
  
    mapHouses.set(houseB.idHouse, houseB);

    //Maison C
    houseC.idHouse = 'HC';
    houseC.name = 'Maison C';
  
    mapHouses.set(houseC.idHouse, houseC);
    
  }
  
 function  createStarShip() {
    
    //Vaisseau 1
    starshipXJ45.idStarShip = 'XJ45';
    starshipXJ45.name = 'Vaisseau XJ45';
    mapStarships.set(starshipXJ45.idStarShip, starshipXJ45);
    
    //Vaisseau 1
    starshipH43D.idStarShip = 'H43D';
    starshipH43D.name = 'Vaisseau H43D';

    mapStarships.set(starshipH43D.idStarShip, starshipH43D);
  }
