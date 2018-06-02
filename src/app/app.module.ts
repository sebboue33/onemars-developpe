import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTableModule } from '@angular/material';
import { SidebarModule } from 'ng-sidebar';



import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponentComponent } from './menu-component/menu-component.component';
import { AccountComponentComponent } from './account-component/account-component.component';
import { BookingComponentComponent } from './booking-component/booking-component.component';
import { ContactComponentComponent } from './contact-component/contact-component.component';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { BookingBoardComponentComponent } from './booking-board-component/booking-board-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponentComponent,
    AccountComponentComponent,
    BookingComponentComponent,
    ContactComponentComponent,
    AdminComponentComponent,
    LoginComponentComponent,
    BookingBoardComponentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    SidebarModule.forRoot(),
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
