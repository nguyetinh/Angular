import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Incorrect email or password.';
        }
      }, (error: any) => {
        console.error(error);
        this.errorMessage = 'An error occurred. Please try again later.';
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }



}
