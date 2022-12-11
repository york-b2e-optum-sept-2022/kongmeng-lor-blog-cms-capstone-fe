import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";
import {IBlogs} from "../interfaces/blogs/IBlogs";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.accountService.getAllBlogs();
    this.sub1 = this.accountService.$blogs.subscribe({
      next: value => {if (value != null) {
        this.allBlogs = value;
      }}
    });
  }

  allBlogs: IBlogs[] = [];
  sub1: Subscription;
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
