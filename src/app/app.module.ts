import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from './account/account.component';
import { MainComponent } from './main/main.component';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from "@angular/forms";
import {MatDividerModule} from '@angular/material/divider';
import { BlogsComponent } from './blogs/blogs.component';
import { AllusersComponent } from './allusers/allusers.component';
import { MessageComponent } from './message/message.component';




@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    MainComponent,
    BlogsComponent,
    AllusersComponent,
    MessageComponent
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgbModule,
    MatCardModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
