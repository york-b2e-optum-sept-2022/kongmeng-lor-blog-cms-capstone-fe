import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";
import {IAccount} from "../interfaces/IAccount";
import {IMessageSend} from "../interfaces/messages/IMessageSend";

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.accountService.getAllAccounts();
    this.sub1 = this.accountService.$allAccounts.subscribe({
      next: value => {if (value!= null) {
        this.allAccounts = value;
      }}
    });
    this.sub2 = this.accountService.$currentId.subscribe({
      next: value => {
        console.log(value);
        this.currentId = value}
    });
    this.sub3 = this.accountService.$error.subscribe({
      next: value => {this.error = value}
    })

  }


  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  error: string = "";

  allAccounts: IAccount[] = [];
  boolean_Send: boolean = false;
  currentId: number = -1;
  sender_Id: number = -1;
  message: string = "";

  otherUser: IAccount = {
    name: "",
    id: -1,
    email: "",
    messageEntities: [],
    blogEntities: []
  }

  onSend(i: number) {
    this.boolean_Send = true;
    this.otherUser = this.allAccounts[i];
  }
  onCancel() {
    this.boolean_Send = false;
  }








  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  onSendMessage() {
    this.sender_Id = this.otherUser.id;
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

  }





}
