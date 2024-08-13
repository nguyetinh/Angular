import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:3000/api';

constructor(private httpClient: HttpClient) { }

getAll(){
  return this.httpClient.get(`${this.url}/categories`);
}



get(id: string){
  return this.httpClient.get(`${this.url}/categories/${id}`);
}

delete(id: string){
  return this.httpClient.delete(`${this.url}/categories/${id}`);
}

save(category: { name: string }, file: File) {
  const formData = new FormData();
  formData.append('name', category.name);
  formData.append('img', file);

  return this.httpClient.post(`${this.url}/categories`, formData);
}

update(id: string, category: { name: string }, file?: File) {
  const formData = new FormData();
  formData.append('name', category.name);
  if (file) {
    formData.append('img', file);
  }

  return this.httpClient.put(`${this.url}/categories/${id}`, formData);
}

}
