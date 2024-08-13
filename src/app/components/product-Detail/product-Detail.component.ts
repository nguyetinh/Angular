import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-Detail',
  templateUrl: './product-Detail.component.html',
  styleUrls: ['./product-Detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  id!: string;


  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit() {
    this.productService.get(this.id).subscribe(data=>{
      this.product = data as Product;
    }
    )
  }

}
