import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogModel } from '../components/models/add-blog-model';
import { AddBlogService } from '../components/services/add-blog.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public category: string = '';
  public data: any[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private blogService: AddBlogService,
    private route: Router,

  ) { }

  ngOnInit(): void {
    const { type } = this.activateRoute.snapshot.queryParams;
    this.category = type;
    this.getAllblogsByContent();
  }

  getAllblogsByContent() {
    this.blogService.getBlogByContent(this.category).subscribe(response => {
      console.log(response, 'responese here');
      const {body: {data}}: any = response;
      for(let i = 0; i < data?.length; i++){
        let imgPath = data[i]?.cloudinaryPath.split(',');
        data[i].imgPath = imgPath;
      }
      this.data = data;



    }, error => {
      console.log(error, 'error here')
    })
  }

  getBlogsById(data: any) {
    let split = data?.title?.split(' ')?.join('-')?.toString()?.toLowerCase();
    this.route.navigate([`/blog/${split}`], {queryParams: {id: data._id}});
  }


}
