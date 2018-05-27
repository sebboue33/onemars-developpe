import {House} from './House';
import { Booking } from "./Booking";
import { StarShip } from './StarShip';

/**
 * Classe d�crivant un agenda. 
 */



export class Diary {

private tabBooking: Booking[]=[];
private tabHouse: House[]=[];
private tabSpaceShip: StarShip[]=[];
   

    /**
     * Getter $tabBooking
     * @return {Booking[]}
     */
	public get $tabBooking(): Booking[] {
		return this.tabBooking;
	}

    /**
     * Getter $tabHouse
     * @return {House[]}
     */
	public get $tabHouse(): House[] {
		return this.tabHouse;
	}

    /**
     * Getter $tabSpaceShip
     * @return {StarShip[]}
     */
	public get $tabSpaceShip(): StarShip[] {
		return this.tabSpaceShip;
	}

    /**
     * Setter $tabBooking
     * @param {Booking[]} value
     */
	public set $tabBooking(value: Booking[]) {
		this.tabBooking = value;
	}

    /**
     * Setter $tabHouse
     * @param {House[]} value
     */
	public set $tabHouse(value: House[]) {
		this.tabHouse = value;
	}

    /**
     * Setter $tabSpaceShip
     * @param {StarShip[]} value
     */
	public set $tabSpaceShip(value: StarShip[]) {
		this.tabSpaceShip = value;
	}


}