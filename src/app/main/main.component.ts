import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";
import {ICreateAccount} from "../interfaces/ICreateAccount";
import {IAccount} from "../interfaces/IAccount";
import {IHistoryMessage} from "../interfaces/IHistoryMessage";
import {IDisplayMessage} from "../interfaces/IDisplayMessage";

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

  display_Message: IDisplayMessage[] = [];

  onFunction() {
    if (this.current_Account.messageEntities.length == 0 && this.current_Account.blogEntities.length == 0) {
      return;
    }
    let messages: IHistoryMessage[] = [];
    let test2 = this.current_Account.messageEntities[0].history_Messages;
    let test = this.current_Account.messageEntities[0].history_Messages.length;
    for(let key = 0; key < test; key++ ) {
      let test: IHistoryMessage = {
        index: key,
        sender: Object.keys(test2[key]),
        message: Object.values(test2[key])
      }
      messages.push(test);
    }
    for (let i = 0; i < messages.length; i++) {
      const temp: IDisplayMessage = {
        index: i,
        sender: messages[i].sender[0],
        message: messages[i].message[0]
      }
      this.display_Message.push(temp);
    }
    console.log(this.display_Message);
  }

  ngOnDestroy() {
  }

}
