import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private http : HttpClient
  ) { }

  registerUser(user: any){
    return this.http.post<any>(environment.SIGN_UP, user)
  }
  loginUser(user : any){
    return this.http.post<any>(environment.SIGN_IN, user)
  }
}
