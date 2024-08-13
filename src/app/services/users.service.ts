import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.url}/user/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string, userId: string }>(`${this.url}/user/login`, credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/user`);
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post(`${this.url}/forgot-password`, { email }, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(token: string, password: string): Observable<any> {
    console.log(token);

    return this.http.post(`${this.url}/reset-password/${token}`, { token, password }, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
