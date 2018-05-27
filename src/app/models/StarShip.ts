import { Month } from "../enums/Month";

/**
 * Classe d�crivant un vaiseeau. 
 */




export class StarShip {

    private _idStarShip: string;
    private _name: string;
    private _mapBooking: Map<number,string> = new Map<number,string>();


    /**
     * Getter idStarShip
     * @return {string}
     */
	public get idStarShip(): string {
		return this._idStarShip;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    

    /**
     * Setter idStarShip
     * @param {string} value
     */
	public set idStarShip(value: string) {
		this._idStarShip = value;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}


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
   
      

}