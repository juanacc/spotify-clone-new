import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {CookieService} from 'ngx-cookie-service';
import { UserModel } from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //userInSession: EventEmitter<any> = new EventEmitter<any>();
  //user: UserModel = {name: '', email: '', avatar: '', role: ''};
  private readonly URL = environment.apiUrl;
  
  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any>{
    console.log(email, password);
    const body = {
      email,
      password
    };
    //console.log('URL', this.URL);
    return this.httpClient.post(`${this.URL}/auth/login`, body).pipe(
      tap((response:any) => {
        //this.userInSession.emit(response);
        const {data, tokenSession} = response;
        this.cookie.set('token', tokenSession, 4, '/'); //creo una cookie valida por 4 dias y que aplica para toda la aplicacion('/')
        this.cookie.set('role', data.role, 4, '/');
      })
    )
  }
}
