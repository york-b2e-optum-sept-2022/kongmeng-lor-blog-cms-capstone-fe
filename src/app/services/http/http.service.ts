import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ICreateAccount} from "../../interfaces/create/ICreateAccount";
import {Observable} from "rxjs";
import {ILogIn} from "../../interfaces/create/ILogIn";
import {IAccount} from "../../interfaces/IAccount";
import {IBlogs} from "../../interfaces/blogs/IBlogs";
import {IMessageSend} from "../../interfaces/messages/IMessageSend";
import {IMessages} from "../../interfaces/messages/IMessages";
import {IUpdateViews} from "../../interfaces/blogs/IUpdateViews";
import {IDeleteComment} from "../../interfaces/blogs/IDeleteComment";
import {IAddComment} from "../../interfaces/blogs/IAddComment";
import {IEditComment} from "../../interfaces/blogs/IEditComment";
import {IPostBlog} from "../../interfaces/blogs/IPostBlog";

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
  public updateViews(data: IUpdateViews): Observable<IBlogs>{
    return this.httpClient.post(`http://localhost:8008/api/blog/update/views`, data) as Observable<IBlogs>;
  }
  public deleteComment(data: IDeleteComment): Observable<IBlogs> {
    const deleteComment = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        Id: data.Id,
        index: data.index,
        user_Id: data.user_Id
      }
    }
    return this.httpClient.delete("http://localhost:8008/api/blog/delete/comment", deleteComment) as Observable<IBlogs>;
  }
  public addComment(data: IAddComment): Observable<IBlogs> {
    return this.httpClient.post("http://localhost:8008/api/blog/add/comment",data) as Observable<IBlogs>;
  }
  public editComment(data: IEditComment): Observable<IBlogs> {
    return this.httpClient.put("http://localhost:8008/api/blog/edit/comment",data) as Observable<IBlogs>;
  }
  public createBlog(data: IPostBlog) {
    return this.httpClient.post("http://localhost:8008/api/account/post/blog",data);
  }
  public getBlogsById(id: number): Observable<IBlogs[]> {
    return this.httpClient.get(`http://localhost:8008/api/account/get/blogsById?id=${id}`) as Observable<IBlogs[]>;
  }






}
