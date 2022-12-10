import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";
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
        }
      }
    });
  }

  sub1: Subscription;
  current_Account: IAccount = {
    name: "",
    email: "",
    id: -1,
    messageEntities: [],
    blogEntities: []
  }

  onLogOut() {
    this.accountService.$logIn.next(false);
  }



  ngOnDestroy() {
  }

}
