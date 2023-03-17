import { Component, OnInit, } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit() {
    this.loginService.me().subscribe((data: any) => {
      console.log(data);
    },
      (error) => {
        console.log(error);
        console.log(error.status);
        if (error.status == 401 || error.status == 403) {
          this.router.navigate(['/login'])
          localStorage.removeItem('token')
        }
      })
  }


}
