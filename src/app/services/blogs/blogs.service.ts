import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";
import {BehaviorSubject, first, Subscription} from "rxjs";
import {IBlogs} from "../../interfaces/blogs/IBlogs";
import {AccountService} from "../account/account.service";
import {IAccount} from "../../interfaces/IAccount";
import {IPostBlog} from "../../interfaces/blogs/IPostBlog";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private httpService: HttpService, private accountService: AccountService) {}
  $blogs = new BehaviorSubject<IBlogs[] | null>(null);
  $viewAllBlogs = new BehaviorSubject<boolean>(false);
  $createBlogs = new BehaviorSubject<boolean>(false);
  $current_Blogs = new BehaviorSubject<IBlogs[] | null>(null);

  public getAllBlogs() {
    this.httpService.getAllBlogs().pipe(first()).subscribe({
      next: value => {
        this.$blogs.next(value);
      }, error: err => {console.log(err)}
    });
  }
  public createBlog(data: IPostBlog) {
    this.httpService.createBlog(data).pipe(first()).subscribe({
      next: value => {console.log(value)}, error: err => {console.log(err)}
    });
  }
  public getBlogsById(id: number) {
    this.httpService.getBlogsById(id).pipe(first()).subscribe({
      next: value => {this.$current_Blogs.next(value)}, error: err => {console.log(err)}
    });
  }

}
