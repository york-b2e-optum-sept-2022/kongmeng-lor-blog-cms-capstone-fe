import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account/account.service";
import {ILogIn} from "../interfaces/create/ILogIn";
import {Subscription} from "rxjs";
import {ICreateAccount} from "../interfaces/create/ICreateAccount";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.sub1 = this.accountService.$error.subscribe({
      next: value => {this.error = value}
    });
    this.sub2 = this.accountService.$signUp.subscribe({
      next: value => {this.signUp = value}
    });
    console.log(this.signUp);
  }
  sub1: Subscription;
  sub2: Subscription;

  signUp: boolean = false;
  error: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  confirm_Password: string = "";

  onSignUp() {
    this.accountService.$signUp.next(true);
    this.clearVariables();
    this.accountService.$error.next("");
  }
  onCreate() {
    if (this.email == "" || this.password == "" || this.name == "" || this.confirm_Password == "") {
      this.accountService.$error.next("Please make sure you enter all the requirements. Try again.")
      return;
    }
    this.accountService.$error.next("");
    const data: ICreateAccount = {
      email: this.email,
      password: this.password,
      confirm_Password: this.confirm_Password,
      name: this.name,
      id: -1
    }
    this.accountService.createAccount(data);
    this.clearVariables();
  }
  onLogin() {
    const data: ILogIn = {
      email: this.email,
      password: this.password
    }
    this.accountService.logIn(data);
    this.accountService.$error.next("");
  }
  onCancel() {
    this.clearVariables();
    this.accountService.$error.next("");
    this.signUp = false;
  }
  clearVariables() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.confirm_Password = "";
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
