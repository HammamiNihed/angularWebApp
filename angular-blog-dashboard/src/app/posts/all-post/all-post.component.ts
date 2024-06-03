import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  categoryArray!: Array<any>;
  constructor(private cs: CategoriesService) {}

  ngOnInit(): void {
    this.cs.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

}
