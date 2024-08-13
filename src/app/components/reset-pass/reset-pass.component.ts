import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  token!: any;
  resetPasswordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService) {
      this.resetPasswordForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: this.passwordMatchValidator });
    }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.token = params;
        this.token = this.token.token;
        console.log(this.token);
      });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.get('password')?.value;
      console.log(this.token);

      if (this.token) {
        this.usersService.resetPassword(this.token, password).subscribe(
          response => {
            this.successMessage = 'Password has been updated successfully.';
            this.router.navigate(['/user-login']);
          },
          error => {
            this.errorMessage = 'Error resetting password.';
            console.error('Error resetting password', error);
          }
        );
      } else {
        this.errorMessage = 'Token is missing.';
      }
    }
  }

}
