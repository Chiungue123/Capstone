import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.auth;
  private url = `${this.apiUrl}${this.endpoint}`;

  private loggedUserSubject = new BehaviorSubject<User>(new User());
  loggedUser$: Observable<User> = this.loggedUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  getLoggedUser(): User {
    return this.loggedUserSubject.value;
  }

  signIn(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}${this.endpoint}/login`, user).pipe(tap(user => {
      this.loggedUserSubject.next(user)
    }));
  }

  signOut(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.endpoint}/logout`).pipe(tap(() => {
      this.loggedUserSubject.next(new User());
    }));
  }

  validate(user: User): Observable<User> {
    const fullPath = `${this.apiUrl}${this.endpoint}/validate`;
    return this.http.post<User>(fullPath, user);
  }

  register(user: User): Observable<User> {
    console.log('Auth Service: Register()');
    console.log('POST URL: ', `${this.apiUrl}${this.endpoint}/register`);
    console.log('User:', user);
    return this.http.post<User>(`${this.apiUrl}${this.endpoint}/register`, user);
  }
  
}