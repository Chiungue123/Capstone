import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.auth;
  private url = this.apiUrl + this.endpoint;

  constructor(private http: HttpClient) { }

  validate(user: User): Observable<User> {
    const fullPath = `${this.apiUrl}${this.endpoint}/validate`;
    
    //console.log('Full path: ', fullPath);
    //console.log('Authenticating User:', user);
  
    return this.http.post<User>(fullPath, user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + this.endpoint + '/register', user);
  }

  signIn(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + this.endpoint + '/login', user);
  }

  signOut(): Observable<any> {
    return this.http.get(this.apiUrl + this.endpoint + '/logout');
  }
}