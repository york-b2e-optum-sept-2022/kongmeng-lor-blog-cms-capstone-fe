import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account/account.service";
import {Subscription} from "rxjs";
import {IAccount} from "../interfaces/IAccount";
import {IBlogs} from "../interfaces/blogs/IBlogs";
import {IMessages} from "../interfaces/messages/IMessages";
import {BlogsService} from "../services/blogs/blogs.service";
import {nextMonthDisabled} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy{
  constructor(private accountService: AccountService, private blogService: BlogsService) {
    this.sub1 = this.accountService.$current_Account.subscribe({
      next: value => {
        if (value != null) {
          this.current_Account = value;
          this.accountService.$currentId.next(this.current_Account.id);
        }
      }
    });
    this.accountService.getAllMessagesById(this.current_Account.id);
    this.sub2 = this.accountService.$messages.subscribe({
      next: value => {if (value != null) {
        this.messages = value;
      }}
    });
    this.sub3 = this.accountService.$boolean_Full_Blogs.subscribe({
      next: value => {this.viewFullBlogs = value}
    });
    this.sub4 = this.blogService.$createBlogs.subscribe({
      next: value => {this.createBlogs = value}
    });
    this.sub5 = this.blogService.$viewAllBlogs.subscribe({
      next: value => {this.viewAllBlogs = value}
    });
  }

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;

  createBlogs: boolean = false;
  viewAllBlogs: boolean = false;
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
    this.sub4.unsubscribe();
    this.sub5.unsubscribe();
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
