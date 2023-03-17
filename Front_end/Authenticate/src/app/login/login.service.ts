import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IPayload {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  register(payload: IPayload) {
    return this.http.post('http://localhost:5000/api/register', payload)
  }

  login(payload: IPayload) {
    return this.http.post('http://localhost:5000/api/login', payload)
  }
  me() {
    return this.http.get('http://localhost:5000/api/me')
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
