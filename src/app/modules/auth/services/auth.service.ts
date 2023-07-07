import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.apiUrl;
  constructor(private httpClient: HttpClient, private cookie: CookieService) { }

  sendCredentials(email: string, password: string): Observable<any>{
    console.log(email, password);
    const body = {
      email,
      password
    };
    console.log('URL', this.URL);
    return this.httpClient.post(`${this.URL}/auth/login`, body).pipe(
      tap((response:any) => {
        const {data, tokenSession} = response;
        this.cookie.set('token', tokenSession, 4, '/'); //creo una cookie valida por 4 dias y que aplica para toda la aplicacion('/')
      })
    )
  }
}
