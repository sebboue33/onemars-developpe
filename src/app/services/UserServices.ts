import { ROUTES } from './Router';
import { User } from '../models/User';
import { Category } from '../enums/Category';


const user = new User();
const admin = new User();
const mapUsers = new Map<string, User>();

export function createUSer(userToCreate: User ) {

console.log(user);

}

export function getUserInfo( login: string) {
    return mapUsers.get(login);
}

export function initUsers() {

    //Utilisateur
    user.firstName = 'BOUE';
    user.lastname = 'Sébastien';
    user.login = 'sboue';
    user.category = Category.USER;
    user.password = 'sboue';

    mapUsers.set(user.login, user);

    //Administrateur
    admin.firstName = 'Administrateur';
    admin.lastname = 'Administrator';
    admin.login = 'admin';
    admin.category = Category.ADMIN;
    admin.password = 'admin';

    mapUsers.set(admin.login, admin);
  }

  export function checkAuthorization($event) {
    let messageAlert = '';

    if (mapUsers.get($event.login) === undefined) {
        messageAlert = 'Utilisateur inconnu !';
      } else if ($event.password !== mapUsers.get($event.login).password){
        messageAlert = 'Mot de passe invalide pour cet utilisateur !';
      }
      return messageAlert;

  }
