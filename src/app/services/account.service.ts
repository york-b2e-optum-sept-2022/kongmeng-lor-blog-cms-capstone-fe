import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {ICreateAccount} from "../interfaces/create/ICreateAccount";
import {BehaviorSubject, connect, first, Subscription} from "rxjs";
import {ILogIn} from "../interfaces/create/ILogIn";
import {IAccount} from "../interfaces/IAccount";
import {IBlogs} from "../interfaces/blogs/IBlogs";
import {IMessageSend} from "../interfaces/messages/IMessageSend";
import {IMessages} from "../interfaces/messages/IMessages";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService) {}

  $current_Account = new BehaviorSubject<IAccount | null>(null);
  $blogs = new BehaviorSubject<IBlogs[] | null>(null);
  $allAccounts = new BehaviorSubject<IAccount[] | null>(null);
  $error = new BehaviorSubject<string>("");
  $logIn = new BehaviorSubject<boolean>(false);
  $currentId = new BehaviorSubject<number>(-1);
  $message = new BehaviorSubject<IMessages[] | null>(null);


  message: IMessages = {
    id: -1,
    historyEntities: [],
    current_Message: "",
    owner: "",
    email_From: "",
    email_To: "",
  }


  public createAccount(data: ICreateAccount) {
    this.httpService.createAccount(data).pipe(first()).subscribe({
      next: data => {console.log(data)}, error: err => {console.log(err)}
    });
  }
  public logIn(data: ILogIn) {
    this.httpService.login(data).pipe(first()).subscribe({
      next: data => {
        this.$current_Account.next(data);
        this.$logIn.next(true);
      }, error: err => {
        if (err.status == 404) {
          this.$error.next("Can't find account. Please create an account.");
          return;
        }
        this.$error.next("Please make sure your email and password is enter.");
      }
    })
  }
  public getAllBlogs() {
    this.httpService.getAllBlogs().pipe(first()).subscribe({
      next: value => {
        this.$blogs.next(value);
      }, error: err => {console.log(err)}
    });
  }
  public getAllAccounts() {
    this.httpService.getAllAccounts().subscribe({
      next: value => {this.$allAccounts.next(value)}, error: err => {console.log(err)}
    });
  }
  public sendMessage(data: IMessageSend) {
    this.httpService.sendMessage(data).pipe(first()).subscribe({
      next: data => {
        this.message = data;
      }, error: err => {console.log(err)}
    })
  }
  public getAllMessagesById(id: number) {
    this.httpService.getMessagesById(id).subscribe({
      next: value => {this.$message.next(value)}, error: err => {console.log(err)}
    })
  }





}
