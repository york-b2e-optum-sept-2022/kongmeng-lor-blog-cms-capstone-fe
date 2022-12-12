import {Component, OnDestroy} from '@angular/core';
import {MessageService} from "../message.service";
import {AccountService} from "../services/account.service";
import {IAccount} from "../interfaces/IAccount";
import {Subscription} from "rxjs";
import {IMessages} from "../interfaces/messages/IMessages";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnDestroy{
  constructor(private messageService: MessageService, private accountService: AccountService) {
    this.sub1 = this.accountService.$allAccounts.subscribe({
      next: value => {
        if (value != null) {
          this.accounts = value
          this.onFilterAccounts();
        }
      }
    });
    this.sub1 = this.accountService.$currentId.subscribe({
      next: value => {this.currentId = value}
    });
  }
  sub1: Subscription;
  accounts: IAccount[] = [];
  messages: IMessages[] = [];

  onFilterAccounts() {
    const temp = this.accounts.filter(index => index.id != this.currentId);
    this.accounts = temp;
  }

  currentId: number = -1;
  sender_Id: number = -1;
  message: string = "";

  boolean_FindUsers: boolean = false;
  onMessageBoolean: boolean = false;


  onFindUsers() {
    this.boolean_FindUsers = true;
  }
  onInbox() {
    this.boolean_FindUsers = false;
  }

  otherUser: IAccount = {
    name: "",
    id: -1,
    email: "",
    messageEntities: [],
    blogEntities: []
  }

  onMessage(i: number) {
    this.onMessageBoolean = true;
    this.otherUser = this.accounts[i];
    this.sender_Id = this.accounts[i].id;
  }


  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
