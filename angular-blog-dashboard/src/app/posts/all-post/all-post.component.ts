import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  postArray!: Array<any>;
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      
      this.postArray = val;
      console.log(this.postArray);
    });
  }

  onDelete(postImgPath:string,id:any) {
    this.postService.deleteImage(postImgPath,id);
  }

  onFeatured(id:any, value:boolean) {
    const featuredData = {
      isFeatured: value
    }
    this.postService.markFeatured(id, featuredData);
  }

}
