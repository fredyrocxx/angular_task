import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { User } from "./user";
import { Observable } from 'rxjs';

const localUrl = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'jwt-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private _http: HttpClient) { }

  addUsers(user: User): Observable<User> {
    return  this._http.post<User>(`${localUrl}/users`, user, httpOptions);
  }

 

}
