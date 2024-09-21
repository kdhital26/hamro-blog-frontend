import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddBlogService } from '../services/add-blog.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogModel } from '../models/add-blog-model';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit, AfterViewInit {
  @Output() backEmit = new EventEmitter<any>();
  @Input() updatedBlogData: any;
  public blogModel = new BlogModel();
  public file: any[] = [];
  public value = {}
  public base64Image: string | null = null;
  public blogData = [{description: '', file: '', cloudImage: '', class: ''}];
  public cloneFiles: any[] = [];
  public removedFiles: any;
  public titleValidation: boolean = false;
  public Editor = ClassicEditor;
  public destroye$ = new Subject<any>();
  public filePath = environment.filePath;
  public showLoader = false;
  public showBtnLoader = false;


  constructor(
    private addBlogService: AddBlogService,
    private fb: FormBuilder
  ) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.showLoader = false;
    if(this.updatedBlogData?._id) {
      this.getBlogById();
    }
  }

  addBlog(value?: any) {
    if(!this.isTitlepresent()) {
      if(this.isFileUpload()) {
        this.settingUpValues();
        if(this.updatedBlogData?._id) {
          this.updateBlogById()
        } else {
          this.createBlog();
        }
      }
    }
  }

  createBlog() {
    this.showBtnLoader = true;
    this.addBlogService.addBlog(this.blogModel)
      .pipe(takeUntil(this.destroye$))
      .subscribe(res => {
        this.showBtnLoader = false;
        this.back();
      }, error => {
        this.showBtnLoader = false;
        console.log(error);
      })
  }

  getBlogById() {
    this.showLoader = true;
    this.addBlogService.getBlogById(this.updatedBlogData._id)
    .pipe(takeUntil(this.destroye$))
    .subscribe((result: any) =>{
      this.showLoader = false;
      const {data : {title, value, _id, category}, comments} = result;
      // this.blogModel.title = title;
      // this.blogModel._id = _id;
      this.blogData = value;
      // this.blogModel.category = category;
      this.blogModel = result.data;
      this.blogModel.commentId = comments;

    }, error => {
      this.showLoader = false;
      console.log(error);
    })
  }

  updateBlogById() {
    this.showBtnLoader = true;
    let imagePath = this.blogData.map(res => res.cloudImage).toString();
    this.blogModel.imagePath = imagePath;
    this.blogModel.cloudeImage = imagePath;
    if(this.setIndex?.length) {
      this.blogModel.deleteImgCount = [...new Set(this.setIndex)];
    }
    this.addBlogService.updataBlog(this.blogModel)
    .pipe(takeUntil(this.destroye$))
    .subscribe(result => {
      this.showBtnLoader = false;
      this.back();
    }, error => {
      this.showBtnLoader = false;
      console.log(error, 'error here')
    })
  }

  settingUpValues() {
      this.blogData.forEach((res: any) => {
        res['class'] = 'hb__primary'
      });
      let description = ''
      for(let i = 0; i < this.blogData?.length; i++) {
        description += this.blogData[i].description + '--SPLIT_HERE--';
      }
      this.blogModel.description = description;
      this.blogModel.file = this.file;
  }

  isTitlepresent(): boolean {
    let title = this.blogModel.title;
    if(title) {
      this.titleValidation = false;
      return false;
    } else {
      this.titleValidation = true;
      return true;
    }
  }

  isFileUpload(): boolean {
    let hasFilledAllValue: any = this.blogData.filter(res => {return !res.file});
    if(hasFilledAllValue?.length) {
      hasFilledAllValue[0]['class'] = 'border border-danger';
      return false;
    } else {
      return true
    }
  }

  selectFiles(file: any, i: number) {
    if(!this.file.length) {
      this.file.push(file.target.files);
      this.cloneFiles.push(file.target.files[0].name)

    } else {
      let index = this.cloneFiles.findIndex(res => res === this.removedFiles);
      if(index < 0) {
        this.file.push(file.target.files);
        this.cloneFiles.push(file.target.files[0].name)
      } else {
        this.file.splice(index, 0, file.target.files);
        this.cloneFiles[index] = file.target.files[0].name

      }
    }
    const inputElement = file.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.convertToBase64(selectedFile, i);
    }
  }

  convertToBase64(file: File, i: number): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;
      this.blogData[i].file = this.base64Image;
    };
    reader.readAsDataURL(file);
  }

  addSection() {
    this.blogData.push({description: '', file: '', cloudImage: '', class: ''});
    this.removedFiles = '';
  }

  public index: number = -1;
  public setIndex: any[] = [];
  removeImg(i: number) {
    this.index = i;
    this.blogData[i].file = '';
    this.file.splice(i, 1);
    // this.removedFiles = this.file[i][0]?.name;
    this.blogData[i].cloudImage = '';
    this.setIndex.push(i);
  }

  removeSection(i: number) {
    this.blogData[i].file = '';
    this.blogData[i].cloudImage = '';
    this.blogData.splice(i, 1);

  }

  back() {
    this.blogModel = new BlogModel();
    this.backEmit.emit();
  }

}
