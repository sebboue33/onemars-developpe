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
    private _house: House;
    private _starShip: StarShip;


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
     * Getter house
     * @return {House}
     */
    public get house(): House {
        return this._house;
    }

    /**
     * Getter starShip
     * @return {StarShip}
     */
    public get starShip(): StarShip {
        return this._starShip;
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
     * Setter house
     * @param {House} value
     */
    public set house(value: House) {
        this._house = value;
    }

    /**
     * Setter starShip
     * @param {StarShip} value
     */
    public set starShip(value: StarShip) {
        this._starShip = value;
    }



}