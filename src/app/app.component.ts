import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "./services/account/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
     this.sub1 = this.accountService.$logIn.subscribe({
      next: value => {this.logIn = value}
    });
  }

  sub1: Subscription;

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  logIn: boolean = false;
}
