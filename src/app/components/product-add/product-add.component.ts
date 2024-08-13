import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  categories!: Category[];

  selectedFile: File | null = null;
  imageValid: boolean = true;
  imageTouched: boolean = false;

  constructor(private categoryService: CategoryService,private productService: ProductService, private router: Router) {
    this.product = new Product;
    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'price': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),

    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data=>{
      this.categories = data as Category[];
    }
    )
  }

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
    if (this.productForm.invalid || !this.selectedFile) {
      alert('Vui lòng điền chính xác vào tất cả các trường và chọn hình ảnh.');
      return;
    }

    const productName = this.productForm.get('name')?.value;
    const productPrice = this.productForm.get('price')?.value;
    const productDescription = this.productForm.get('description')?.value;
    this.productService.save({ name: productName, price: productPrice, description: productDescription }, this.selectedFile).subscribe({
      next: (data) => {
        console.log('Đã Thêm Sản phẩm:', data);
        this.router.navigate(['../product-list']);
      },
      error: (error) => console.error('Lỗi Khi Thêm Sản Phẩm:', error),
      complete: () => console.log('Việc bổ sung sản phẩm đã hoàn tất')
    });
  }
}
