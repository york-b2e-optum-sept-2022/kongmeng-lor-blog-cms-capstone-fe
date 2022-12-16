import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {ICreateAccount} from "../../interfaces/create/ICreateAccount";
import {BehaviorSubject, first} from "rxjs";
import {ILogIn} from "../../interfaces/create/ILogIn";
import {IAccount} from "../../interfaces/IAccount";
import {IBlogs} from "../../interfaces/blogs/IBlogs";
import {IMessageSend} from "../../interfaces/messages/IMessageSend";
import {IMessages} from "../../interfaces/messages/IMessages";
import {IUpdateViews} from "../../interfaces/blogs/IUpdateViews";
import {IDeleteComment} from "../../interfaces/blogs/IDeleteComment";
import {IAddComment} from "../../interfaces/blogs/IAddComment";
import {IEditComment} from "../../interfaces/blogs/IEditComment";
import {BlogsService} from "../blogs/blogs.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService, private blogService: BlogsService) {}

  $current_Account = new BehaviorSubject<IAccount | null>(null);
  $allAccounts = new BehaviorSubject<IAccount[] | null>(null);
  $error = new BehaviorSubject<string>("");
  $logIn = new BehaviorSubject<boolean>(false);
  $currentId = new BehaviorSubject<number>(-1);
  $messages = new BehaviorSubject<IMessages[] | null>(null);
  $boolean_Full_Blogs = new BehaviorSubject<boolean>(false);
  $current_Blog = new BehaviorSubject<IBlogs | null>(null);


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
      next: data => {}, error: err => {console.log(err)}
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
  public getAllAccounts() {
    this.httpService.getAllAccounts().pipe(first()).subscribe({
      next: value => {this.$allAccounts.next(value)}, error: err => {console.log(err)}
    });
  }
  public sendMessage(data: IMessageSend) {
    this.httpService.sendMessage(data).pipe(first()).subscribe({
      next: value => {
        this.message = value;
        this.getAllMessagesById(data.current_Id);
      }, error: err => {console.log(err)}
    })
  }
  public getAllMessagesById(id: number) {
    this.httpService.getMessagesById(id).pipe(first()).subscribe({
      next: value => {this.$messages.next(value)}, error: err => {console.log(err)}
    })
  }
  public updateViews(data: IUpdateViews) {
    this.httpService.updateViews(data).pipe(first()).subscribe({
      next: value => {
        this.$current_Blog.next(value);
        this.blogService.getAllBlogs();
      }, error: err => {console.log(err)}
    });
  }
  public deleteComment(data: IDeleteComment) {
    this.httpService.deleteComment(data).pipe(first()).subscribe({
      next: value => {
        this.$current_Blog.next(value)
      }, error: err => {console.log(err)}
    });
  }
  public addComment(data: IAddComment) {
    this.httpService.addComment(data).pipe(first()).subscribe({
      next: value => {
        this.$current_Blog.next(value)
        this.blogService.getAllBlogs();
      }, error: err => {console.log(err)}
    });
  }
  public editComment(data: IEditComment) {
    this.httpService.editComment(data).pipe(first()).subscribe({
      next: value => {this.$current_Blog.next(value)}, error: err => {console.log(err)}
    })
  }





}
