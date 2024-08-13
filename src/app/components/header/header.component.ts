import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  keyword!: string;
  categories!: Category[];
  constructor(private router: Router, private CategoryService: CategoryService) {

    this.CategoryService.getAll().subscribe(data =>{
      this.categories = data as Category[];
    });
  }
  ngOnInit() {
  }

  onSearch(){
    this.router.navigate(['/products'],
      {queryParams: {keyword: this.keyword}}
    )
  }
}
