import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
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
    //private cookie: CookieService
    ){}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
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
      console.log('Inicio de sesion OK', response);
      //const {data, tokenSession} = response;
      //this.cookie.set('token', tokenSession, 4, '/'); //creo una cookie valida por 4 dias y que aplica para toda la aplicacion('/')
    }, err =>{
      this.errorSeession = true;
      console.log('Email o password erroneo');
    });
  }
}
