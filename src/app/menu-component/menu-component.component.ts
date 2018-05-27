import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.less']
})
export class MenuComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output()
  showUserComponentEvent = new EventEmitter();

  @Output()
  showBookingComponentEvent = new EventEmitter();
  
  @Output()
  showContactComponentEvent = new EventEmitter();
  
  @Output()
  showBookingBoardComponentEvent = new EventEmitter();
  
  @Output()
  deconnectUserEvent = new EventEmitter();


  private _showUserComponent(){
    this.showUserComponentEvent.emit(null);
  }

  private _showBookingComponent(){
    this.showBookingComponentEvent.emit(null);
  }

  private _showContactComponent(){
    this.showContactComponentEvent.emit(null);
  }

  private _showBookingBoardComponent(){
    this.showBookingBoardComponentEvent.emit(null);
  }

  private _deconnectUser(){
    this.deconnectUserEvent.emit(null);
  }

  @Input()
  admin: boolean;

}
