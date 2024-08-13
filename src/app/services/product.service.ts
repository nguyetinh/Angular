import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:3000/api';

constructor(private httpClient: HttpClient) { }

getAll(){
  return this.httpClient.get(`${this.url}/products`);
}

getProductByQuery(params: any){
  console.log("params",params);
  let query = '';
  if (params.keyword) {
    query = `${params.keyword}`;
  }else if (params.category) {
    query = `categories=${params.category}`;
  }
  console.log("query",query);
  console.log(`${this.url}/products?${query}`);
  
  
  return this.httpClient.get(`${this.url}/products/search/${query}`);
}

getProductsByCategory(categoryId: string){
  return this.httpClient.get(`${this.url}/products/categoryid/${categoryId}`);

}

get(id: string){
  return this.httpClient.get(`${this.url}/products/${id}`);
}

delete(id: string){
  return this.httpClient.delete(`${this.url}/products/${id}`);
}

save(product: { name: string, price: number, description: string }, file: File) {
  console.log("product.description",product.description);
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('description', product.description);
  formData.append('img', file);
  return this.httpClient.post(`${this.url}/products`, formData);
}

update(id: string, product: { name: string, price: number, description: string }, file?: File) {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('description', product.description);
  if (file) {
    formData.append('img', file);
  }

  return this.httpClient.put(`${this.url}/products/${id}`, formData);
}
}
