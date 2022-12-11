import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";
import {IAccount} from "../interfaces/IAccount";
import {IBlogs} from "../interfaces/blogs/IBlogs";
import {IMessages} from "../interfaces/messages/IMessages";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.sub1 = this.accountService.$current_Account.subscribe({
      next: value => {
        if (value != null) {
          this.current_Account = value;
          this.accountService.$currentId.next(this.current_Account.id);
        }
      }
    });
    this.accountService.getAllMessagesById(this.current_Account.id);
    this.sub2 = this.accountService.$message.subscribe({
      next: value => {if (value != null) {
        this.messages = value;
        console.log(this.messages);
      }}
    });
    this.sub3 = this.accountService.$boolean_Full_Blogs.subscribe({
      next: value => {this.viewFullBlogs = value}
    });


  }

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  messages: IMessages[] = [];

  viewFullBlogs: boolean = false;

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
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
  message: IMessages = {
    owner: "",
    email_To: "",
    id: -1,
    email_From: "",
    current_Message: "",
    historyEntities: []
  }
  boolean_History: boolean = false;
  onHistory(i: number) {
    this.message = this.messages[i];
    this.boolean_History = true;
  }
  onReturn() {
    this.boolean_History = false;
  }
}
