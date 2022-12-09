import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {ILogIn} from "../interfaces/ILogIn";
import {Subscription} from "rxjs";
import {ICreateAccount} from "../interfaces/ICreateAccount";

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
  }
  sub1: Subscription;
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  signUp: boolean = false;
  error: string = "";
  onSignUp() {
    this.signUp = true;
  }
  name: string = "";
  email: string = "";
  password: string = "";
  confirm_Password: string = "";

  onCreate() {
    const data: ICreateAccount = {
      email: this.email,
      password: this.password,
      confirm_Password: this.confirm_Password,
      name: this.name,
      id: -1
    }
    this.accountService.createAccount(data);

    this.clearVariables();
    this.signUp = false;
  }
  onLogin() {
    const data: ILogIn = {
      email: this.email,
      password: this.password
    }
    this.accountService.logIn(data);
    console.log(this.email)
    console.log(this.password)
  }
  onCancel() {


    this.clearVariables();
    this.signUp = false;
  }

  clearVariables() {
    this.name = "";
    this.email = "";
    this.password = "";
  }


}
