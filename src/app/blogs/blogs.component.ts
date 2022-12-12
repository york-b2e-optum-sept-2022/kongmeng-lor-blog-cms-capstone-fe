import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account/account.service";
import {Subscription} from "rxjs";
import {IBlogs} from "../interfaces/blogs/IBlogs";
import {BlogsService} from "../services/blogs/blogs.service";
import {IAccount} from "../interfaces/IAccount";
import {IPostBlog} from "../interfaces/blogs/IPostBlog";
import {IDeleteBlog} from "../interfaces/blogs/IDeleteBlog";
import {IComments} from "../interfaces/blogs/IComments";
import {IEditBlogs} from "../interfaces/blogs/IEditBlogs";
import {IAddComment} from "../interfaces/blogs/IAddComment";
import {IDeleteComment} from "../interfaces/blogs/IDeleteComment";

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
          console.log(value)
          this.blogService.getBlogsById(this.current_Account.id);
        }
      }
    });
    this.sub3 = this.blogService.$current_Blogs.subscribe({
      next: value => {
        if (value!= null) {
          this.my_Blogs = value;
        }
      }
    });
    this.sub4 = this.accountService.$current_Blog.subscribe({
      next: value => {
        if (value!= null){
          this.blog = value;
          this.blog.commentsLists = this.blog.commentsLists.sort(function (a,b) { return b.id - a.id});
        }
       }
    })

  }


  allBlogs: IBlogs[] = [];
  my_Blogs: IBlogs[] = [];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

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
    this.booleanEdit = false;
    this.booleanView2 = false;
  }
  booleanViewMine: boolean = false;
  viewMyBlogs() {
    this.booleanViewAll = false;
    this.booleanViewMine = true;
    this.booleanCreateBlogs = false;
    this.blogService.$createBlogs.next(false);
    this.blogService.$viewAllBlogs.next(false);
    this.booleanEdit = false;
    this.booleanView2 = false;
  }
  booleanCreateBlogs: boolean = false;
  createBlogs() {
    this.booleanViewAll = false;
    this.booleanViewMine = false;
    this.booleanCreateBlogs = true;
    this.blogService.$createBlogs.next(true);
    this.blogService.$viewAllBlogs.next(false);
    this.booleanEdit = false;
    this.booleanView2 = false;
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
    this.blogService.getBlogsById(this.current_Account.id);
    this.onCancel();
  }
  blogId: number = -1;
  onDelete(i: number) {
    this.blogId = this.my_Blogs[i].id;
    const data: IDeleteBlog = {
      ownerId: this.current_Account.id,
      blogId: this.blogId
    }
    this.blogService.deleteBlog(data);
  }
  blog: IBlogs = {
    id: -1,
    title: "",
    body: "",
    create_Date: "",
    update_Date: "",
    owner_Email: "",
    owner_Id: -1,
    view_Counts: -1,
    view_Accounts: [],
    commentsLists: []
  }
  booleanEdit: boolean = false;
  editTitle: string = "";
  editBody: string = "";
  onEdit(i: number) {
    this.blog = this.my_Blogs[i];
    this.editTitle = this.blog.title;
    this.editBody = this.blog.body;
    this.booleanEdit = true;
  }
  saveEditBlog() {
    const temp: IEditBlogs = {
      Id: this.blog.id,
      title: this.editTitle,
      body: this.editBody,
      update_Date: "12-12-2022"
    }
    this.blogService.editBlog(temp, this.current_Account.id);
    this.title = "";
    this.body = "";
    this.booleanEdit = false;
  }
  onCancelEdit() {
    this.booleanEdit = false;
    this.title = "";
    this.body = "";
  }
  booleanView2: boolean = false;
  index: number = -1;
  onViewComments(i: number) {
    this.index = i;
    this.blog = this.my_Blogs[i];
    console.log(this.blog)
    this.blog.commentsLists = this.blog.commentsLists.sort(function (a,b) { return b.id - a.id});
    console.log(this.blog)
    this.booleanView2 = true;
  }
  onCancel2() {
    this.booleanView2 = false;
    this.my_Blogs[this.index] = this.blog;
  }
  comment: string = "";
  onAddComment() {
    if (this.comment === "") {
      this.accountService.$error.next("Can not add empty comment. Please add something.");
      return;
    }
    this.accountService.$error.next("");
    const data: IAddComment = {
      Id: this.blog.id,
      user_Id: this.current_Account.id,
      comments: this.comment
    }
    this.accountService.addComment(data);
  }

  onDeleteComment(i: number) {
    console.log(this.blog.commentsLists[i]);

    const testing : number = Math.abs((i - this.blog.commentsLists.length));

    const data: IDeleteComment = {
      Id: this.blog.id,
      index:  (testing -1),
      user_Id: this.current_Account.id
    }
    this.accountService.deleteComment(data);
    this.accountService.$current_Blog.subscribe({
      next: value => {
        if (value!=null)
          this.blog = value;
          this.blog.commentsLists = this.blog.commentsLists.sort(function (a,b) { return b.id - a.id});
      }
    });
  }
  num: number = 0;
  booleanCommentsView: boolean = false;
  viewAllComments() {
    console.log(this.num)
    if (this.num === 0) {
      this.booleanCommentsView = true;
      this.num = 1;
      return;
    }
    if (this.num === 1) {
      this.booleanCommentsView = false;
      this.num = 0;
      return;
    }
  }

}
