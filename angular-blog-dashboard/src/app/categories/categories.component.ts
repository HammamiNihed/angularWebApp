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
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId!: string;
  ngOnInit(): void {
    this.cs.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onsubmit(formData: any) {
    let categoryData = {
      category: formData.value.category,
    };

    if (this.formStatus == 'Add') {
      this.cs.saveData(categoryData);
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.cs.updateData(this.categoryId, categoryData);
      this.formStatus = 'Add';
      formData.reset();
    }
  }

  onEdit(category: any, id: string) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.cs.deleteData(id);
  }
}
