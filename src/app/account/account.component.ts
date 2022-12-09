import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor() {}

  signUp: boolean = false;
  onSignUp() {
    this.signUp = true;
  }
  name: string = "";
  email: string = "";
  password: string = "";

  onCreate() {
    console.log(this.name)
    console.log(this.email)
    console.log(this.password)

    this.clearVariables();
    this.signUp = false;
  }
  onLogin() {
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
