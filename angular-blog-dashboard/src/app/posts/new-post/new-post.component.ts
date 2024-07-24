import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-img.png';
  selectedImg: any;
  categoryArray!: Array<any>;
  disabled: boolean = true;
  postForm!: FormGroup;
  post: any;
  docId!: string; 
  formStatus: string = 'Add New';
  constructor(
    private cs: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(val => {
      this.docId = val['id'];
      if(this.docId) {
        this.postService.loadPostById(val['id']).subscribe(post => {
        
          this.post = post;
          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(10)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });
  
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
  
        })
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(10)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
     
    })

    
    
  }

  ngOnInit(): void {
    this.cs.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    // '/\s/g':this pattern replace the space
    this.permalink = title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splited = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splited[0],
        category: splited[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    this.postService.uploadImage(this.selectedImg, postData,this.formStatus,this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-img.png';
  }

  
}
