import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";
import {ICreateAccount} from "../interfaces/ICreateAccount";
import {IAccount} from "../interfaces/IAccount";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.sub1 = this.accountService.$current_Account.subscribe({
      next: value => {
        console.log(value);
        if (value != null) {
          this.current_Account = value;
          console.log(this.current_Account);
        }
      }
    });
    this.onFunction();


  }

  sub1: Subscription;
  current_Account: IAccount = {
    name: "",
    email: "",
    id: -1,
    messageEntities: [],
    blogEntities: []
  }
  temp: any = "";

  onFunction() {
    let test = this.current_Account.messageEntities[0].history_Messages;

    for(let key in test ) {
      console.log(Object.keys(test));
      console.log(Object.values(test));
    }


  }

  ngOnDestroy() {
  }

}
