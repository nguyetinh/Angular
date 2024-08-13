import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  category!: Category;
  id: string;
  selectedFile: File | null = null;
  imageValid: boolean = true;
  imageTouched: boolean = false;
  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private CategoryService: CategoryService,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
    console.log(`id is ${this.id}`);

    this.categoryForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'id': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.CategoryService.get(this.id).subscribe(data => {
      this.category = data as Category;
      this.imageUrl = this.category.img; //
      this.categoryForm.setValue({
        name: this.category.name
      });
    });
  }

  onFileSelected(event: any) {
    this.imageTouched = true;
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageValid = true;

      // Hiển thị ảnh mới được chọn
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageValid = false;
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      alert('Vui lòng điền chính xác vào tất cả các trường.');
      return;
    }

    const categoryName = this.categoryForm.get('name')?.value;

    if (this.selectedFile) {
      this.CategoryService.update(this.id, { name: categoryName }, this.selectedFile).subscribe({
        next: (data) => {
          console.log('Đã Sửa Danh Mục:', data);
          this.router.navigate(['../category-list']);
        },
        error: (error) => console.error('Lỗi Khi Sửa Danh Mục:', error),
        complete: () => console.log('Việc sửa danh mục đã hoàn tất')
      });
    } else {
      this.CategoryService.update(this.id, { name: categoryName }).subscribe({
        next: (data) => {
          console.log('Đã Sửa Danh Mục:', data);
          this.router.navigate(['../category-list']);
        },
        error: (error) => console.error('Lỗi Khi Sửa Danh Mục:', error),
        complete: () => console.log('Việc sửa danh mục đã hoàn tất')
      });
    }
  }
}
