import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICreateAccount} from "../interfaces/create/ICreateAccount";
import {Observable} from "rxjs";
import {ILogIn} from "../interfaces/create/ILogIn";
import {IAccount} from "../interfaces/IAccount";
import {IBlogs} from "../interfaces/blogs/IBlogs";
import {IMessageSend} from "../interfaces/messages/IMessageSend";
import {IMessages} from "../interfaces/messages/IMessages";

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
  public getAllBlogs(): Observable<IBlogs[]> {
    return this.httpClient.get("http://localhost:8008/api/blog/get/allblogs") as Observable<IBlogs[]>;

  }
  public getAllAccounts(): Observable<IAccount[]> {
    return this.httpClient.get("http://localhost:8008/api/account/getAll") as Observable<IAccount[]>
  }
  public sendMessage(data: IMessageSend): Observable<IMessages> {
    return this.httpClient.post("http://localhost:8008/api/account/sendMessage", data) as Observable<IMessages>;
  }
  public getMessagesById(id: number): Observable<IMessages[]> {
    return this.httpClient.get(`http://localhost:8008/api/account/get/messagesById?id=${id}`) as Observable<IMessages[]>;
  }
}
