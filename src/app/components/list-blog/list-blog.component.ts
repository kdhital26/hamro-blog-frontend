import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogModel } from '../models/add-blog-model';
import { AddBlogService } from '../services/add-blog.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  public destroyed$ = new Subject<boolean>();
  public blogListData: any[] = [];
  public filePath = environment.filePath;
  public showBlogView: boolean = false;
  public blogData: any;
  public showLoader = true;
  public email = ''

  constructor(
    private blogService: AddBlogService
  ) {
    let loggedInUserDetails: any = sessionStorage.getItem('loggedInUser');
    let userDetails = JSON.parse(loggedInUserDetails);
    this.email = userDetails?.email
   }

  ngOnInit(): void {
    this.getAllBlogLis();
  }

  getAllBlogsList() {
    this.showLoader = true;
    this.blogService.getAllBlogs()
    .subscribe((result: any) => {
      this.showLoader = false;
      const { body: {data} } = result;
      this.settingUpData(data)
    })
  }

  getAllBlogLis() {
    this.showLoader = true;
    this.blogService.getAllBlogsByUser()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: any) => {
      this.showLoader = false;
      const { body: {data} } = result;
      this.settingUpData(data)
    }, error => {
      this.showLoader = false;
      console.log(error);
    });
  }

  settingUpData(data: any) {
    for(let i = 0; i < data.length; i++){
      let splitedFile = data[i].cloudinaryPath.split(',');
      data[i]['splitedFiles'] = splitedFile;
      const regex = new RegExp(environment.splitTag, "g");
      data[i]['description'] = data[i]['description'].replace(regex, ' ');
    }
    this.blogListData = data;
  }

  delete(data: BlogModel) {
    this.blogService.deleteBlog(data)
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: any) => {
      if(result.body.message === 'Deleted Successfully') {
        this.getAllBlogLis();
      }
    })
  }

  editBlog(data: any, i: number) {
    this.blogData = data;
    this.addBlog();
  }

  addBlog() {
    this.showBlogView = !this.showBlogView;
  }

  back() {
    this.addBlog();
    this.getAllBlogLis();
    this.blogData = [];
  }

  setAllBlogs(event: any){
    console.log(event,'here');
    if(event.target.checked) {
      this.getAllBlogsList();
    } else {
      this.getAllBlogLis();
    }
  }

}
