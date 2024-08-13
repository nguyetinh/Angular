import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component'; // khai bao dung cho routes
import { HttpClientModule } from '@angular/common/http';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { ProductsListComponent } from './components/product-list/products-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductsEditComponent } from './components/product-edit/products-edit.component';
import { ProductDetailComponent } from './components/product-Detail/product-Detail.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ProductsComponent } from './components/products/products.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';










//dinh nghia cac routes du an
const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-register', component: UserRegisterComponent },
  {path: 'category-list', component: CategoryListComponent },
  {path: 'category-add', component: CategoryAddComponent },
  {path: 'category-edit/:id', component: CategoryEditComponent },
  {path: 'product-list', component: ProductsListComponent },
  {path: 'product-add', component: ProductAddComponent },
  {path: 'product-edit/:id', component: ProductsEditComponent },
  {path: 'product-Detail/:id', component: ProductDetailComponent },
  {path: 'products', component: ProductsComponent },
  {path: 'reset-pass', component: ResetPassComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent },


  {path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductsListComponent,
    ProductAddComponent,
    ProductsEditComponent,
    ProductDetailComponent,
    UserRegisterComponent,
    UserLoginComponent,
    ProductsComponent,
    ResetPassComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
