import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products!: Product[];

  constructor(private ProductService: ProductService) { }

  getAllproducts() {
    this.ProductService.getAll().subscribe(data => {
      this.products = data as Product[];
    }, error => {
      console.error('Có lỗi khi tải danh mục:', error);
    });
  }

ngOnInit(){
  return this.ProductService.getAll().subscribe(data =>{
    this.products = data as Product[];
  });
}
confirmDelete(id: string) {
  if (window.confirm('Bạn có chắc muốn xóa danh mục này không?')) {
    this.ProductService.delete(id).subscribe(
      response => {
        console.log('Danh mục đã được xóa thành công!');
        this.getAllproducts();
      },
      error => {
        console.error('Có lỗi khi xóa danh mục:', error);
      }
    );
  }
}

}
