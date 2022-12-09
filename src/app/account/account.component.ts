import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor() {}

  signUp: boolean = true;
  onSignUp() {
    this.signUp = true;
  }
  name: string = "";
  email: string = "";
  password: string = "";

  onCreate() {

  }
  onLogin() {

  }
  onCancel() {

  }



}
