  import { Component, OnInit } from '@angular/core';
  import { Category } from 'src/app/models/category';
  import { Product } from 'src/app/models/product';
  import { CategoryService } from 'src/app/services/category.service';
  import { ProductService } from 'src/app/services/product.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent implements OnInit{
    products! : Product[];
    category! : Category[];
    categoryId: Category | null = null;


    constructor(private productService: ProductService, private categoryService: CategoryService){}

    ngOnInit() {
      this.loadProducts();
      this.loadCategories();
    }

    loadProducts() {
      this.productService.getAll().subscribe(data => {
        this.products = data as Product[];
        console.log(this.products);
      });
    }

    loadCategories() {
      this.categoryService.getAll().subscribe(data => {
        this.category = data as Category[];
        console.log(this.category);
      });
    }
    // onCategoryChange(id:any) {
    //   this.productService.getProductsByCategory(this.id).subscribe((data) => {
    //     this.products = data as Product[];
    //     this.fetchProductsByCategory();
    //   })
      
    // }
    fetchProductsByCategory(id:string) {
      // if (this.categoryId) {
        this.productService.getProductsByCategory(id).subscribe(
          (data) => {
            this.products = data as Product[];
          },
          (error) => {
            console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
            // Hiển thị thông báo lỗi cho người dùng
            alert('Đã xảy ra lỗi khi lấy sản phẩm. Vui lòng thử lại sau.');
          }
        );
      //}
    }
  }
