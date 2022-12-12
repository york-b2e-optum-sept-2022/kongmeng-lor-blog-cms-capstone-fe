import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account/account.service";
import {Subscription} from "rxjs";
import {IBlogs} from "../interfaces/blogs/IBlogs";
import {BlogsService} from "../services/blogs/blogs.service";
import {IAccount} from "../interfaces/IAccount";
import {IPostBlog} from "../interfaces/blogs/IPostBlog";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnDestroy{
  constructor(private accountService: AccountService, private blogService: BlogsService) {
    this.blogService.getAllBlogs();
    this.sub1 = this.blogService.$blogs.subscribe({
      next: value => {if (value != null) {
        this.allBlogs = value;
      }}
    });
    this.sub2 = this.accountService.$current_Account.subscribe({
      next: value => {
        if (value!= null) {
          this.current_Account = value
          this.blogService.getBlogsById(this.current_Account.id);
        }
      }
    });
    this.sub3 = this.blogService.$current_Blogs.subscribe({
      next: value => {
        if (value!= null) {
          console.log(value)
          this.my_Blogs = value;
        }
      }
    });

  }


  allBlogs: IBlogs[] = [];
  my_Blogs: IBlogs[] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  current_Account: IAccount = {
    id: -1,
    email: "",
    name: "",
    messageEntities: [],
    blogEntities: []
  }


  booleanViewAll: boolean = false;
  viewAll() {
    this.booleanViewAll = true;
    this.booleanViewMine = false;
    this.booleanCreateBlogs = false;
    this.blogService.$createBlogs.next(false);
    this.blogService.$viewAllBlogs.next(true);
  }
  booleanViewMine: boolean = false;
  viewMyBlogs() {
    this.booleanViewAll = false;
    this.booleanViewMine = true;
    this.booleanCreateBlogs = false;
    this.blogService.$createBlogs.next(false);
    this.blogService.$viewAllBlogs.next(false);
  }
  booleanCreateBlogs: boolean = false;
  createBlogs() {
    this.booleanViewAll = false;
    this.booleanViewMine = false;
    this.booleanCreateBlogs = true;
    this.blogService.$createBlogs.next(true);
    this.blogService.$viewAllBlogs.next(false);
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
  onCancel() {
    this.booleanViewAll = false;
    this.booleanViewMine = true;
    this.booleanCreateBlogs = false;
    this.blogService.$createBlogs.next(false);
    this.blogService.$viewAllBlogs.next(false);
    this.title = "";
    this.body = "";
  }
  title: string = "";
  body: string = "";
  onCreate() {
    const data: IPostBlog = {
      title: this.title,
      body: this.body,
      create_Date: "12-12-2022",
      update_Date: "12-12-2022",
      owner_Email: this.current_Account.email,
      owner_Id: this.current_Account.id
    }
    this.blogService.createBlog(data);
    this.onCancel();
  }
}
