import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Page1Component } from './page1/page1.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Page1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AppComponent, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
