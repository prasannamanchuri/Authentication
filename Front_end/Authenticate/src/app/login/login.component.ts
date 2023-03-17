import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

interface IPayload {
  email: string
  password: string
}
interface IData {
  message: string;
  token: string;
  status: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email = "prasanan@gmail.com";
  public password = "12345";
  // public email = "";
  // public password = "";
  constructor(private loginService: LoginService, private router: Router) {

  }

  handleSubmit() {
    this.loginService.login({ email: this.email, password: this.password }).subscribe((data: any) => {
      console.log(data);
      if (data.status == 1) {
        localStorage.setItem('token', data.token)
        this.router.navigate([''])
      }


    },
      (error) => {
        console.log(error)
      })
  }

}
