import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Category } from 'src/app/enums/Category';

@Component({
  selector: 'app-account-component',
  templateUrl: './account-component.component.html',
  styleUrls: ['./account-component.component.less']
})
export class AccountComponentComponent implements OnInit {

  constructor() { }

  private _getUserCategory(cat){
    if(cat===Category.USER){
      return "Utilisateur";
    }else{
      return "Administrateur";
    }
  }

  ngOnInit() {
  }

  @Input()
  userSelected:User;

}
