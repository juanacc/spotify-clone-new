import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@shared/services/user.service';
import { UserModel } from '@core/models/user.model';
//import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  formLogin: FormGroup = new FormGroup({});
  errorSeession: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private userService: UserService 
    //private cookie: CookieService
    ){}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formLogin = new FormGroup({
      email: new FormControl('test@test.com', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('12345678', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }

  sendLogin(): void{
    //const body = this.formLogin.value;
    const {email, password} =this.formLogin.value;
    //console.log(body)
    this.authService.sendCredentials(email, password).subscribe(response =>{
      //console.log('Inicio de sesion OK', response.data);
      //this.userService.userInSession.emit(response); VER PORQUE NO FUNCIONA
      //this.router.navigate(['/', 'tracks'])
      
      // const {name, email, avatar, role} = response.data;
      // const user: UserModel = {
      //   name,
      //   email,
      //   avatar,
      //   role,
      // }

      // this.authService.user = user;
      this.router.navigate(['tracks']);

      //const {data, tokenSession} = response;
      //this.cookie.set('token', tokenSession, 4, '/'); //creo una cookie valida por 4 dias y que aplica para toda la aplicacion('/')
    }, err =>{
      this.errorSeession = true;
      console.log('Email o password erroneo');
    });
  }
}
