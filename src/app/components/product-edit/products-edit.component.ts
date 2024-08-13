import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  productForm: FormGroup;
  product!: Product;
  categories!: Category[];
  id: string;
  selectedFile: File | null = null;
  imageValid: boolean = true;
  imageTouched: boolean = false;
  imageUrl: string = '';

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.id = route.snapshot.params['id'];
    console.log(`id is ${this.id}`);

    this.productForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'price': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      // 'id': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data=>{
      this.categories = data as Category[];
    });
    this.productService.get(this.id).subscribe(data => {
      this.product = data as Product;
      this.imageUrl = this.product.img; //
      this.productForm.setValue({
        name: this.product.name,
        price: this.product.price,
        description: this.product.description
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
    if (this.productForm.invalid) {
      alert('Vui lòng điền chính xác vào tất cả các trường.');
      return;
    }

    const productName = this.productForm.get('name')?.value;
    const productPrice = this.productForm.get('price')?.value;
    const productDescription = this.productForm.get('description')?.value;

    if (this.selectedFile) {
      this.productService.update(this.id, { name: productName, price: productPrice, description: productDescription}, this.selectedFile).subscribe({
        next: (data) => {
          console.log('Đã Sửa sản phẩm:', data);
          this.router.navigate(['../product-list']);
        },
        error: (error) => console.error('Lỗi Khi Sửa sản phẩm:', error),
        complete: () => console.log('Việc sửa sản phẩm đã hoàn tất')
      });
    } else {
      this.productService.update(this.id, { name: productName, price: productPrice, description: productDescription }).subscribe({
        next: (data) => {
          console.log('Đã Sửa sản phẩm:', data);
          this.router.navigate(['../product-list']);
        },
        error: (error) => console.error('Lỗi Khi Sửa sản phẩm:', error),
        complete: () => console.log('Việc sửa sản phẩm đã hoàn tất')
      });
    }
  }
}
