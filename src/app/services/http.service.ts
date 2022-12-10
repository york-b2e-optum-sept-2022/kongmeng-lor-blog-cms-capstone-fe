import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICreateAccount} from "../interfaces/create/ICreateAccount";
import {Observable} from "rxjs";
import {ILogIn} from "../interfaces/create/ILogIn";
import {IAccount} from "../interfaces/IAccount";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public createAccount(data: ICreateAccount): Observable<ICreateAccount> {
    return this.httpClient.post("http://localhost:8008/api/account", data) as Observable<ICreateAccount>;
  }

  public login(data: ILogIn): Observable<IAccount> {
    return this.httpClient.get(`http://localhost:8008/api/account/login?email=${data.email}&password=${data.password}`) as Observable<IAccount>;
  }



}
