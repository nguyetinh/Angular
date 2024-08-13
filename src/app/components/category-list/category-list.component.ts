import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  categories!: Category[];

  constructor(private CategoryService: CategoryService) { }

  getAllCategories() {
    this.CategoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    }, error => {
      console.error('Có lỗi khi tải danh mục:', error);
    });
  }

ngOnInit(){
  return this.CategoryService.getAll().subscribe(data =>{
    this.categories = data as Category[];
  });
}
confirmDelete(id: string) {
  if (window.confirm('Bạn có chắc muốn xóa danh mục này không?')) {
    this.CategoryService.delete(id).subscribe(
      response => {
        console.log('Danh mục đã được xóa thành công!');
        this.getAllCategories();
      },
      error => {
        console.error('Có lỗi khi xóa danh mục:', error);
      }
    );
  }
}
}
