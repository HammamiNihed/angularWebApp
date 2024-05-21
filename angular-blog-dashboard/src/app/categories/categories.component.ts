import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private cs: CategoriesService) {}

  categoryArray!: Array<any>;
  ngOnInit(): void {
    this.cs.loadData().subscribe( val => {
      
      console.log(val);
      this.categoryArray = val;
    })
  }

  onsubmit(formData: any) {
    let categoryData = {
      category: formData.value.category,
    };

    this.cs.saveData(categoryData);
    formData.reset();
  }
}
