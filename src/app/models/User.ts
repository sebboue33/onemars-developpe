import { Category } from "../enums/Category";

/**
 * Classe décrivant un utilisateur. 
 */
 export class User {

    private _lastname: string;
    private _firstName: string;
    private _login: string;
    private _category: Category;
    private _password: string;
    private _idUser: string;


    /**
     * Getter idUser
     * @return {idUser}
     */
	 get idUser(): string {
		return this._idUser;
	}

    /**
     * Setter idUser
     * @param {idUser} value
     */
	 set idUser(value: string) {
		this._idUser = value;
	}
    /**
     * Getter category
     * @return {Category}
     */
	 get category(): Category {
		return this._category;
	}

    /**
     * Setter category
     * @param {Category} value
     */
	 set category(value: Category) {
		this._category = value;
	}


    /* Getters et Setters */
    get lastname(): string {
        return this._lastname;
    }

    set lastname(lastname: string) {
        this._lastname = lastname;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    get login(): string {
        return this._login;
    }

    set login(login: string) {
        this._login = login;
    }
 


    /**
         * Getter password
         * @return {string}
         */
     get password(): string {
        return this._password;
    }

    /**
     * Setter password
     * @param {string} value
     */
         set password(value: string) {
        this._password = value;
    }



}


