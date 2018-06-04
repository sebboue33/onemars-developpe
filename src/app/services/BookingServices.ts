import { ROUTES } from './Router';
import { House } from '../models/House';
import { StarShip } from '../models/StarShip';
import { Booking } from '../models/Booking';
import * as UserServices from '../services/UserServices';

const mapBooking = new Map<string, Booking>();
const mapHouses = new Map<string, House>();
const mapStarships = new Map<string, StarShip>();
const houseA = new House();
const houseB = new House();
const houseC = new House();
const starshipXJ45 = new StarShip();
const starshipH43D = new StarShip();
let starShipXJ45Available = true;
let starShipH43DAvailable = true;

const STARSHIP_ID_XJ45 = 'XJ45';
const STARSHIP_ID_H43D = 'H43D';
const HOUSE_ID_HA = 'HA';
const HOUSE_ID_HB = 'HB';
const HOUSE_ID_HC = 'HC';


export function createBooking(bookingToCreate: Booking) {

    starShipXJ45Available = true;
    starShipH43DAvailable = true;
    let codeRet = 0;


    codeRet = checkBookingValidity(bookingToCreate);

    if (codeRet === 200 || codeRet === 300) {
        //Ajout de la reservation a la map des réservation 
        const generator = new IDGenerator();
        let idNewBooking = generator.generate();
        bookingToCreate.idBooking = idNewBooking;
        mapBooking.set(idNewBooking, bookingToCreate);
    }



    return (codeRet);
}

function checkBookingValidity(bookingToCreate) {

let codeRet = 0;
let monthOverLap = false;

    // Parcours la map des reservations
    for (const keyBooking of Array.from(mapBooking.keys())) {

        // Init de la réservation parcourue
        const bookingTemp = mapBooking.get(keyBooking);

        if (bookingTemp.idHouse === bookingToCreate.idHouse) {

            // Test la date de début et de fin

            let startMonthOverLap = false;
            let endMonthOverLap = false;

            if (bookingTemp.startMonth === bookingTemp.endMonth  ){
                startMonthOverLap = datesAreOverLap(bookingTemp, bookingToCreate.startMonth, bookingToCreate.endMonth);
            } else {
                 startMonthOverLap = dateIsOverLap(bookingTemp, bookingToCreate.startMonth);
                 endMonthOverLap = dateIsOverLap(bookingTemp, bookingToCreate.endMonth);
            }

            // Regarde si la resa deja ^resente a un vaisseau
            if (startMonthOverLap || endMonthOverLap) {
                monthOverLap = true;
            }
        }
        checkStarShipAvailable(bookingTemp);
    }

    if (monthOverLap) {
        bookingToCreate.idStarShip = STARSHIP_ID_H43D;
        codeRet = 400;
    } else {
        // Assigne le vaisseau si dispo
        if (starShipXJ45Available) {
            bookingToCreate.idStarShip = STARSHIP_ID_XJ45;
            codeRet = 200;
        } else if (starShipH43DAvailable) {
            bookingToCreate.idStarShip = STARSHIP_ID_H43D;
            codeRet = 200;
        } else {
            codeRet = 300;
        }
    }

    return codeRet;
}

/**
     * Methode permettant de connaitre la dispo des vaisseaux.
     * @param bookingTemp 
     */
    function checkStarShipAvailable(bookingTemp) {

        starShipXJ45Available = true;
        starShipXJ45Available = true;

        if (bookingTemp.idStarShip !== undefined && bookingTemp.idStarShip !== null) {
            const starshipTemp = mapStarships.get(bookingTemp.idStarShip);

            if (starshipTemp !== null && starshipTemp.idStarShip === STARSHIP_ID_XJ45) {
                starShipXJ45Available = false;
            }

            if (starshipTemp !== null && starshipTemp.idStarShip === STARSHIP_ID_H43D) {
                starShipH43DAvailable = false;
            }
        }
    }

/**
 * Methode determinant si la date de la resa est en chevauchement avec une date deja presente.
 * @param dateBooking
 * @param dateBookingToCreate
 */
function dateIsOverLap(dateBooking, dateBookingToCreate) {

        return dateBookingToCreate.id >= dateBooking.startMonth.id && dateBookingToCreate.id <= dateBooking.endMonth.id;

}
function datesAreOverLap(dateBooking, dateStartBookingToCreate,dateEndBookingToCreate) {

        return dateStartBookingToCreate.id <= dateBooking.startMonth.id && dateEndBookingToCreate.id >= dateBooking.endMonth.id;
   
}

/**
 * 
 * @param booking Mise a jour de la resa si pas de chevauchement.
 */
export function updateBooking(booking) {

    const bookingSave = mapBooking.get(booking.idBooking);

    mapBooking.delete(booking.idBooking);
    const codeRet = checkBookingValidity(booking);

    if(codeRet === 200 || 300){
        mapBooking.set(booking.idBooking, booking);
    }else{
        mapBooking.set(booking.idBooking, bookingSave);
    }

    return  codeRet;
}

/**
 * Suppression d'un resa
 * @param idBooking
 */
export function deleteBooking(idBooking) {

    mapBooking.delete(idBooking);
}

export function getBookingByUSer(userId) {
}

export function getAllBooking() {
}

export function initRessources() {
    createHouse();
    createStarShip();


}

export function getHouses(): Map<string, House> {
    return mapHouses;
}

export function getStarShips() {
    return mapStarships;
}

/**
 * Création des maisons.
 */
function createHouse() {

    // Maison A
    houseA.idHouse = HOUSE_ID_HA;
    houseA.name = 'Maison A';

    mapHouses.set(houseA.idHouse, houseA);

    // Maison B
    houseB.idHouse = HOUSE_ID_HB;
    houseB.name = 'Maison B';
    mapHouses.set(houseB.idHouse, houseB);

    // Maison C
    houseC.idHouse = HOUSE_ID_HC;
    houseC.name = 'Maison C';

    mapHouses.set(houseC.idHouse, houseC);

}

/**
 * Création des vaisseaux.
 */
function createStarShip() {

    // Vaisseau 1
    starshipXJ45.idStarShip = STARSHIP_ID_XJ45;
    starshipXJ45.name = 'Vaisseau XJ45';
    mapStarships.set(starshipXJ45.idStarShip, starshipXJ45);

    // Vaisseau 1
    starshipH43D.idStarShip = STARSHIP_ID_H43D;
    starshipH43D.name = 'Vaisseau H43D';

    mapStarships.set(starshipH43D.idStarShip, starshipH43D);
}


/**
 * Methode generation trouvée sur le net ...
 */
function IDGenerator() {

    const length = 8;
    const timestamp = +new Date;

    const _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.generate = function () {
        const ts = timestamp.toString();
        var parts = ts.split('').reverse();
        var id = "";

        for (var i = 0; i < length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return id;
    }


}

export function getBookingsByUser(userId){

    let mapBookingByUser = new Map<string, Booking>();

    // Parcours la map des reservations
    for (const keyBooking of Array.from(mapBooking.keys())) {

        if (mapBooking.get(keyBooking).idUser === userId){
            mapBookingByUser.set(keyBooking, mapBooking.get(keyBooking) );
        }
    }

    return mapBookingByUser;
}

export function getHouseById(idHouse) {
    return mapHouses.get(idHouse);
}

export function getStarShipById(idStarShip) {
    return mapStarships.get(idStarShip);
}
