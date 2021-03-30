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
  public editId: string;
  
  constructor(private _http: HttpClient) { }


  
  addUsers(user): Observable<User> {
    
    return  this._http.post<User>(`${localUrl}/users/`, user, httpOptions);
  }

  getUserData(id): Observable<User> {
    console.log(`${localUrl}/users?id=`+ id);
    
    return  this._http.get<User>(`${localUrl}/users?id=`+ id, httpOptions);
  }

  updateUser(user,id): Observable<User> {
    console.log(`${localUrl}/users?id=`+ id);
    
    return  this._http.put<User>(`${localUrl}/users?id=`+ id,user, httpOptions);
  }
 
 

}
