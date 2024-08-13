import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;

  selectedFile: File | null = null;
  imageValid: boolean = true;
  imageTouched: boolean = false;

  constructor(private CategoryService: CategoryService, private router: Router) {
    this.category = new Category;
    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {}

  onFileSelected(event: any) {
    this.imageTouched = true;
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageValid = true;
    } else {
      this.imageValid = false;
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid || !this.selectedFile) {
      alert('Vui lòng điền chính xác vào tất cả các trường và chọn hình ảnh.');
      return;
    }

    const categoryName = this.categoryForm.get('name')?.value;
    this.CategoryService.save({ name: categoryName }, this.selectedFile).subscribe({
      next: (data) => {
        console.log('Đã Thêm Danh Mục:', data);
        this.router.navigate(['../category-list']);
      },
      error: (error) => console.error('Lỗi Khi Thêm Danh Mục:', error),
      complete: () => console.log('Việc bổ sung danh mục đã hoàn tất')
    });
  }


}
