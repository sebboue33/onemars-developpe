import { House } from './House';
import { StarShip } from './StarShip';



/**
 * Classe d�crivant une réservation. 
 */



export class Booking {


    private _idUser: string;
    private _idBooking: string;
    private _startMonth: string;
    private _endMonth: string;
    private _idHouse: string;
    private _idStarShip: string;

    /**
     * Getter idUser
     * @return {string}
     */
    public get idUser(): string {
        return this._idUser;
    }

    /**
     * Getter idBooking
     * @return {string}
     */
    public get idBooking(): string {
        return this._idBooking;
    }

    /**
     * Getter startMonth
     * @return {string}
     */
    public get startMonth(): string {
        return this._startMonth;
    }

    /**
     * Getter endMonth
     * @return {string}
     */
    public get endMonth(): string {
        return this._endMonth;
    }



    /**
     * Setter idUser
     * @param {string} value
     */
    public set idUser(value: string) {
        this._idUser = value;
    }

    /**
     * Setter idBooking
     * @param {string} value
     */
    public set idBooking(value: string) {
        this._idBooking = value;
    }

    /**
     * Setter startMonth
     * @param {string} value
     */
    public set startMonth(value: string) {
        this._startMonth = value;
    }

    /**
     * Setter endMonth
     * @param {string} value
     */
    public set endMonth(value: string) {
        this._endMonth = value;
    }

 
     /**
     * Setter idStarShip
     * @param {string} value
     */
    public set idStarShip(value: string) {
        this._idStarShip = value;
    }

     /**
     * Getter idStarShip
     * @return {string}
     */
    public get idStarShip(): string {
        return this._idStarShip;
    }
 
     /**
     * Setter idHouse
     * @param {string} value
     */
    public set idHouse(value: string) {
        this._idHouse = value;
    }

     /**
     * Getter idHouse
     * @return {string}
     */
    public get idHouse(): string {
        return this._idHouse;
    }


}