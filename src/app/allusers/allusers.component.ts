import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {filter, Subscription} from "rxjs";
import {IAccount} from "../interfaces/IAccount";
import {IMessageSend} from "../interfaces/messages/IMessageSend";
import {IBlogs} from "../interfaces/blogs/IBlogs";
import {IComments} from "../interfaces/blogs/IComments";
import {IUpdateViews} from "../interfaces/blogs/IUpdateViews";
import {IDeleteComment} from "../interfaces/blogs/IDeleteComment";
import {IAddComment} from "../interfaces/blogs/IAddComment";
import {IEditComment} from "../interfaces/blogs/IEditComment";

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.accountService.getAllAccounts();
    this.sub1 = this.accountService.$allAccounts.subscribe({
      next: value => {if (value!= null) {
        this.allAccounts = value;
        console.log(this.allAccounts);
        this.onFilterAccounts();
      }}
    });
    this.sub2 = this.accountService.$currentId.subscribe({
      next: value => {
        this.currentId = value}
    });
    this.sub3 = this.accountService.$error.subscribe({
      next: value => {this.error = value}
    });

    this.accountService.$current_Blog.subscribe({
      next: value => {
        if (value!= null) {
          this.blog = value;
          this.comments = [];
          this.comments = this.blog.commentsLists;
        }
      }
    });




  }

  onFilterAccounts() {
    const temp = this.allAccounts.filter(index => index.id != this.currentId);
    this.allAccounts = temp;
  }


  search: string = "";


  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  error: string = "";

  allAccounts: IAccount[] = [];
  boolean_Send: boolean = false;
  currentId: number = -1;
  sender_Id: number = -1;
  message: string = "";

  otherUser: IAccount = {
    name: "",
    id: -1,
    email: "",
    messageEntities: [],
    blogEntities: []
  }

  onSend(i: number) {
    this.boolean_Send = true;
    this.otherUser = this.allAccounts[i];
  }
  onCancel() {
    this.boolean_Send = false;
    this.boolean_Blogs = false;

  }
  boolean_Blogs: boolean = false;

  onViewBlogs(i: number) {
    this.otherUser = this.allAccounts[i];
    this.boolean_Blogs = true;
    this.accountService.$boolean_Full_Blogs.next(true);
  }
  blog: IBlogs = {
    id: -1,
    title: "",
    body: "",
    create_Date: "",
    update_Date: "",
    owner_Email: "",
    owner_Id: "",
    view_Counts: -1,
    view_Accounts: [],
    commentsLists: []
  }
  boolean_ViewMore: boolean = false;
  comments: IComments[] = [];
  blog_Index: number = -1;
  onViewMore(i: number) {
    this.blog_Index = i;
    this.blog = this.otherUser.blogEntities[i];
    this.accountService.$current_Blog.next(this.blog);
    this.comments = this.blog.commentsLists;
    this.boolean_ViewMore = true;
    const temp: IUpdateViews = {
      blogId: this.blog.id,
      userId: this.currentId
    }
    this.accountService.updateViews(temp);
  }

  onDeleteComment(i: number) {
    this.comments = [];
    const data: IDeleteComment = {
      Id: this.blog.id,
      index: i,
      user_Id: this.currentId
    }
    this.accountService.deleteComment(data);
    this.accountService.$current_Blog.subscribe({
      next: value => {
        if (value!=null)
          this.blog = value;
      }
    });
  }

  comment_String: string = "";

  onAddComment() {
    if (this.comment_String === "") {
      this.accountService.$error.next("Can not add empty comment. Please add something.");
      return;
    }
    this.accountService.$error.next("");
    const data: IAddComment = {
      Id: this.blog.id,
      user_Id: this.currentId,
      comments: this.comment_String
    }
    this.accountService.addComment(data);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  onSendMessage() {
    this.sender_Id = this.otherUser.id;
    if (this.message=="") {
      this.accountService.$error.next("Can not send an empty message. Please enter a message.");
      return;
    }
    this.accountService.$error.next("");
    const message: IMessageSend = {
      current_Id: this.currentId,
      message: this.message,
      sender_Id: this.sender_Id
    }
    this.accountService.sendMessage(message);
  }

  current_Comment: IComments = {
    id: -1,
    comment: "",
    sender: -1,
    sender_Name: "",
    sender_Email: ""
  }
  boolean_Comment: boolean = false;
  edit_Comment: string = "";
  comment_Index: number = -1;
  onEditComment(i: number) {
    this.current_Comment = this.comments[i];
    this.comment_Index = i;
    this.edit_Comment = this.current_Comment.comment;
    this.boolean_Comment = true;
  }
  onSaveComment() {
    if (this.edit_Comment === "") {
      this.accountService.$error.next("Cannot save empty string. Please try again.");
      return;
    }
    this.accountService.$error.next("");
    const data: IEditComment = {
      id: this.blog.id,
      index: this.comment_Index,
      comment: this.edit_Comment
    }
    this.accountService.editComment(data);
    this.boolean_Comment = false;
  }
  onCancel2() {
    this.boolean_Comment = false
  }

}
