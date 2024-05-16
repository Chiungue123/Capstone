import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, finalize, share, shareReplay, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class UserService {

  private apiUrl = `${environment.apiUrl}${environment.endpoints.users}`;
  private usersSubject = new BehaviorSubject<User[]>([]);
  user$: Observable<User[]> = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    /*this.loadUserData().subscribe(users => {
      this.usersSubject.next(users);
    });*/
  }
  
  private loadUserData(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
  getUsers() {
    return this.loadUserData().pipe(
      tap(users => {
        this.usersSubject.next(users);
      }),
      switchMap(() => this.user$)
    );
  }

  getUser(id: Number) {
    console.log("User Service: Getting User ID: ", id);
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User) {
    console.log("User Service: Adding User: ", this.apiUrl + "/add");
    return this.http.post<User>(`${this.apiUrl}/add`, user).pipe(tap(user => {
      const currentUsers = this.usersSubject.value;
      this.usersSubject.next([...currentUsers, user])
    }));
  }

  updateUser(user: User) {
    console.log("Update User Called")
    return this.http.put<User>(`${this.apiUrl}/update/${user.Id}`, user).pipe(
      tap((updatedUser: User) => {    
        this.usersSubject.next(this.usersSubject.value.map(u => u.Id === updatedUser.Id ? updatedUser : u));
        //console.log("After User Subject: ", this.usersSubject.value);
      }),
      catchError(error => {
        console.error("Failed to update user", error);
        return throwError(() => new Error("Update failed"));
      }),
      finalize(() => this.getUsers())
    );
  }
  /* 
    The update method leverages the map operator to update the user in the BehaviorSubject.
    The map operator transforms the array of users in the BehaviorSubject by replacing the user with the updated user.
    This creates a new reference to the array, triggering the BehaviorSubject to emit the updated array to all subscribers.
    The Dashboard subscribes to the BehaviorSubject and recieves the updated array of users.
  */

  deleteUser(id: Number) {
    console.log("User Service: Deleting User ID: ", id);
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(tap(() => {
      const currentUsers = this.usersSubject.value.filter(user => user.Id !== id);
      this.usersSubject.next(currentUsers);
    }));
  }

  objectifyUser(user: User) {
    let updatedUser = new User(user['id'], user['firstName'], user['lastName'], user['username'], '', user['email'],
    user['address'], user['phone'], user['isAdmin'], user['createdOn'], user['modifiedOn']);
    const currentUsers = this.usersSubject.value.filter(u => u.Id !== updatedUser.Id);
    this.usersSubject.next([...currentUsers, updatedUser]);
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