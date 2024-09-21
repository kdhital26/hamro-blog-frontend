import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommentModel, RatingModel } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class AddBlogService {
  readonly addBlogServiceURL: string = `${environment.apiUrl}createblog`;
  readonly getAllBlogUrl: string = `${environment.apiUrl}getallblogs`;
  readonly updateBlogUrl: string = `${environment.apiUrl}updateblog`;
  readonly deleteBlogUrl: string = `${environment.apiUrl}deleteblog`;
  readonly settingUpRatingUrl: string = `${environment.apiUrl}setRating`;
  readonly createCommentsUrl: string = `${environment.apiUrl}createComment`;
  readonly getAllRatingUrl: string = `${environment.apiUrl}getAllRating`;
  readonly getAllTrendingTopicUrl: string = `${environment.apiUrl}getAllTrendingTopic`;
  readonly getLatesTopicUrl: string = `${environment.apiUrl}getLatest`;
  readonly getBlogByContentByUrl: string = `${environment.apiUrl}getBlogByContent`;
  readonly getAllBlogsByUserURL: string = `${environment.apiUrl}getBlogsByUser`;
  
  constructor(
    private http: HttpClient
  ) { }

  addBlog(data: any) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('userName', data.loggedInUser);

    for(let i = 0; i < data.file.length; i++) {
      let file = data.file[i];
      formData.append('image', file[0]);
    }
    return this.http.post(this.addBlogServiceURL, formData)
  }

  updataBlog(data: any) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('_id', data._id);
    formData.append('description', data.description);
    formData.append('file', data.imagePath);
    formData.append('cloudImagPath', data.cloudeImage);
    formData.append('category', data.category);
    formData.append('view', data.count);
    formData.append('userName', data.createdBy);
    formData.append('commentId', JSON.stringify(data.commentId));
    for(let i = 0; i < data.file.length; i++) {
      let file = data.file[i];
      formData.append('image', file[0]);
    }
    return this.http.post(this.updateBlogUrl, formData)
  }

  deleteBlog(data: any) {
    const formData = new FormData();
    formData.append('_id', data._id);
   return this.http.post(this.deleteBlogUrl, formData, {observe: 'response'});
  }

  // getIPAddress()
  // {
  //   return this.http.get("http://api.ipify.org/?format=json");
  // }

  getAllBlogs() {
    return this.http.get(this.getAllBlogUrl, {observe: 'response'});
  }

  getBlogById(id: string) {
    return this.http.get(this.getAllBlogUrl + `?_id=${id}`);
  }

  setRating(ratingModel: RatingModel) {
    return this.http.post(this.settingUpRatingUrl, ratingModel, {observe: 'response'});
  }

  createComment(commentModel: CommentModel) {
    return this.http.post(this.createCommentsUrl, commentModel, {observe: 'response'});
  }

  getRating(blogId: string) {
    let params = new HttpParams();
    params = params.set('blogId', blogId);
    return this.http.get(this.getAllRatingUrl, {params: params});
  }

  getAllTrendingTopic() {
    return this.http.get(this.getAllTrendingTopicUrl, {observe: 'response'});
  }

  getLatestTopic(commonModel: any) {
    return this.http.post(this.getLatesTopicUrl, commonModel, {observe: "response"});
  }

  getBlogByContent(body:any) {
    return this.http.post(this.getBlogByContentByUrl, body, {observe: 'response'});
  }

  getAllBlogsByUser() {
    let loggedInUserDetails: any = sessionStorage.getItem('loggedInUser');
    let userDetails = JSON.parse(loggedInUserDetails);
    return this.http.get(this.getAllBlogsByUserURL +`?userName=${userDetails.fullName}`, {observe: 'response'});
  }

}
