import { Month } from "../enums/Month";

/**
 * Classe d�crivant une maison. 
 */



export class House {

private _idHouse: string;
private _name: string;
private _mapBooking: Map<number,string> = new Map<number,string>();

    /**
     * Getter mapBooking
     * @return {Map<number,string> }
     */
	public get mapBooking(): Map<number,string>  {
		return this._mapBooking;
	}

    /**
     * Setter mapBooking
     * @param {Map<number,string> } value
     */
	public set mapBooking(value: Map<number,string> ) {
		this._mapBooking = value;
	}
  

    /**
     * Getter idHouse
     * @return {string}
     */
	public get idHouse(): string {
		return this._idHouse;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    

    /**
     * Setter idHouse
     * @param {string} value
     */
	public set idHouse(value: string) {
		this._idHouse = value;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

   

  }