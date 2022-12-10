import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {ICreateAccount} from "../interfaces/create/ICreateAccount";
import {BehaviorSubject, first, Subscription} from "rxjs";
import {ILogIn} from "../interfaces/create/ILogIn";
import {IAccount} from "../interfaces/IAccount";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService: HttpService) {}

  $current_Account = new BehaviorSubject<IAccount | null>(null);
  $error = new BehaviorSubject<string>("");
  $logIn = new BehaviorSubject<boolean>(false);




  public createAccount(data: ICreateAccount) {
    this.httpService.createAccount(data).pipe(first()).subscribe({
      next: data => {console.log(data)}, error: err => {console.log(err)}
    });
  }
  public logIn(data: ILogIn) {
    this.httpService.login(data).pipe(first()).subscribe({
      next: data => {
        this.$current_Account.next(data);
        console.log(this.$current_Account);
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

  sub1!: Subscription;




}
