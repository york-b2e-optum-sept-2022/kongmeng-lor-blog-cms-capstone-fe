import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account/account.service";
import {IAccount} from "../interfaces/IAccount";
import {Subscription} from "rxjs";
import {IMessages} from "../interfaces/messages/IMessages";
import {IMessageSend} from "../interfaces/messages/IMessageSend";
import {coerceNumberProperty} from "@angular/cdk/coercion";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.sub1 = this.accountService.$allAccounts.subscribe({
      next: value => {
        if (value != null) {
          this.accounts = value
          this.onFilterAccounts();
        }
      }
    });
    this.sub2 = this.accountService.$currentId.subscribe({
      next: value => {this.currentId = value}
    });
    this.sub3 = this.accountService.$error.subscribe({
      next: value => {this.error = value}
    });
    this.sub4 = this.accountService.$messages.subscribe({
      next: value => {
        if (value != null) {
          console.log(value);
          this.messages = value
        }
      }
    });
    this.sub5 = this.accountService.$current_Account.subscribe({
      next: value => {
        if(value!=null) {
          this.current_Account = this.current_Account;
        }
      }
    })
  }
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
  accounts: IAccount[] = [];
  current_Account: IAccount = {
    id: -1,
    email: "",
    name: "",
    messageEntities: [],
    blogEntities: []
  }
  messages: IMessages[] = [];

  booleanHistory: boolean = false;
  booleanReply: boolean = false;

  current_Message: IMessages = {
    id: -1,
    current_Message: "",
    owner: "",
    historyEntities: [],
    email_To: "",
    email_From: ""
}

  onHistory(i: number) {
    this.current_Message = this.messages[i];
    this.booleanHistory = true;
  }
  reply_Id: number = -1;
  onReply(i: number) {
    this.current_Message = this.messages[i];
    console.log(this.current_Message);
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].email === this.current_Message.owner) {
        this.reply_Id = this.accounts[i].id;
        console.log(this.reply_Id);
      }
    }
    if (this.reply_Id === -1) {
      this.reply_Id = this.currentId;
    }
    this.booleanReply = true;
  }
  replySaved() {
    if (this.message=="") {
      this.accountService.$error.next("Can not send an empty message. Please enter a message.");
      return;
    }
    this.accountService.$error.next("");
    const message: IMessageSend = {
      current_Id: this.currentId,
      message: this.message,
      sender_Id: this.reply_Id
    }
    this.accountService.sendMessage(message);
    this.message = "";
    this.booleanReply = false;
  }

  onReturn() {
    this.booleanHistory = false;
    this.booleanReply = false;
    this.accountService.$error.next("");
  }
  onFilterAccounts() {
    const temp = this.accounts.filter(index => index.id != this.currentId);
    this.accounts = temp;
  }

  currentId: number = -1;
  sender_Id: number = -1;
  message: string = "";

  boolean_FindUsers: boolean = false;
  onMessageBoolean: boolean = false;
  error: string = "";


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
  onCancelSend() {
    this.onMessageBoolean = false;
    this.accountService.$error.next("");
    this.message = "";
  }
  onSend() {
    if (this.message=="") {
      this.accountService.$error.next("Can not send an empty message. Please enter a message.");
      return;
    }
    this.accountService.$error.next("");
    const message: IMessageSend = {
      current_Id: this.currentId,
      message: this.message,
      sender_Id: this.sender_Id
    }
    this.accountService.sendMessage(message);
    this.message = "";
    this.onMessageBoolean = false;
    this.boolean_FindUsers = false;
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
