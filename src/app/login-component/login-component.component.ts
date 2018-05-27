import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.less']
})
export class LoginComponentComponent implements OnInit {

  private login="";
  private password="";

  constructor() { }

  ngOnInit() {
  }

  @Output()
  validLoginAndPasswordEvent = new EventEmitter();

  @Output()
  cancelLoginAndPasswordEvent = new EventEmitter();

  @Input()
  messageAlert: string;

   _updateLogin(){
    if(document.getElementsByName("login")[0]!=null){
      this.login = document.getElementsByName("login")[0]["value"];
    }
  }

   _updatePassword(){
    if(document.getElementsByName("password")[0]!=null){
      this.password = document.getElementsByName("password")[0]["value"];
    }
  }

   _valid(){
    this._updateLogin();
    this._updatePassword();
    this.validLoginAndPasswordEvent.emit({ login: this.login, password: this.password });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
     if(event.key==="Enter"){
       this._valid();
     }
  }

}
