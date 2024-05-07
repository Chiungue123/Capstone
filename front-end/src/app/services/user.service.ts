import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class UserService {

  private apiUrl = `${environment.apiUrl}${environment.endpoints.users}`;
  private usersSubject = new BehaviorSubject<User[]>([]);
  user$: Observable<User[]> = this.usersSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    console.log("Loading initial data")
    this.generateTestData();
    this.http.get<User[]>(this.apiUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  getUsers() {
    console.log("Getting users")
    return this.user$;
  }

  getUser(id: Number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}/add`, user).pipe(tap(user => {
      const currentUsers = this.usersSubject.value;
      this.usersSubject.next([...currentUsers, user])
    }));
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrl}/update`, user).pipe(tap(updated => {
      const currentUsers = this.usersSubject.value;
      const index = currentUsers.findIndex(user => user.Id === updated.Id);
      currentUsers[index] = updated;
      this.usersSubject.next([...currentUsers]);
    }));
  }

  deleteUser(id: Number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(tap(() => {
      const currentUsers = this.usersSubject.value.filter(user => user.Id !== id);
      this.usersSubject.next(currentUsers);
    }));
  }

  generateTestData() {
    const testData = [
      new User(1, 'John', 'Doe', 'johndoe', 'password', 'email@example.com', '123 Main St', '555-555-5555', true, new Date(), new Date()),
      new User(2, 'Jane', 'Doe', 'janedoe', 'password', 'janedoe@example.com', '456 Elm St', '555-555-5555', false, new Date(), new Date()),
      new User(3, 'John', 'Smith', 'johnsmith', 'password', 'smith@hotmail.com', '789 Oak St', '555-555-5555', false, new Date(), new Date())
    ];
    
    this.usersSubject.next(testData);
  }
}

/* Exposing the BehaviorSubject as an Observable using the asObservable() method is a design 
pattern in Angular that ensures encapsulation. This practice restricts components from being 
able to emit values back to the BehaviorSubject, thus maintaining a unidirectional data flow 
where the service manages all state changes. This is crucial for keeping the data management 
predictable and debuggable, as it centralizes state mutations to designated service methods. */

/* Using the dollar sign ('$') at the end of variable names that hold Observables is a naming 
convention in the RxJS community. This helps in quickly identifying variables that are 
observables, improving code readability. Typically, you'd use this notation for any variable 
that is an Observable, including Subjects, BehaviorSubjects, ReplaySubjects, etc. */

/* <BehaviorSubject>: A BehaviorSubject holds one current value and emits it to any new 
subscribers as soon as they subscribe, while still being able to emit new values later. 
This is useful for representing "state" in your application. */

/* <Observable>: An Observable declared from a BehaviorSubject using asObservable() is a 
read-only projection. It hides the next() method, preventing outside components from emitting 
new states. */