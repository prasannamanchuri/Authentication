import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@Injectable()
export class AppComponent implements HttpInterceptor {
  title = 'Authenticate';

  constructor(private router: Router, private loginService: LoginService) {

  }
  handleLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])


  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt_token = !!localStorage.getItem('token')
    if (jwt_token) {
      return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem('token')}` }, }));
    }
    else {
      return next.handle(req)
    }
    //   return next.handle(req).do((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       const jwt_token = !!localStorage.getItem('token')
    //       if (jwt_token) {
    //         return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem('token')}` }, }));
    //       }
    //       else {
    //         return next.handle(req)
    //       }

    //     }
    //   }, (error) => {
    //     if (error instanceof HttpErrorResponse {
    //       if (error.status === 401 || error.status === 403) {
    //         this.router.navigate(['/login'])
    //         localStorage.removeItem('token')
    //       }
    //     });
    // });

  }
}




