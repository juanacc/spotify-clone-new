import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@core/models/user.model';
import { AuthService } from '@modules/auth/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  customOptions: Array<any> = [];
  //listObservers$: Subscription[] = [];
  //private user: any;

  constructor(private router: Router, private userService: UserService, private authService: AuthService, private cookie: CookieService){
    //console.log('USUARIO EN SIDEBAR', this.authService.user);
    //this.user = this.authService.user;
  }

  ngOnInit(): void {
    const role = this.cookie.get('role');
    //this.user = this.authService.user;
    //VER PORQUE NO FUNCIONA!!!!
    // const userObserver1$: Subscription = this.userService.userInSession.subscribe((user: any) => {
    //   console.log('USUARIO EN SIDEBAR', user);
    // });
    // const userObserver1$: Subscription = this.authService.userInSession.subscribe((user: any)=>{
    //   console.log('USUARIO EN SIDEBAR', user);
    // })
    //console.log('USUARIO EN SIDEBAR', this.authService.user);
    //this.listObservers$.push(userObserver1$);
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Favoritos',
        icon: 'uil uil-heart',
        router: ['/', 'favorites'],
        //query: { hola: 'mundo' }
      }
    ]

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]

    if(role === 'admin'){
      const adminMenu = {
        name: 'Administracion',
        icon: 'uil uil-setting',
        router: ['/', 'admin']
      }
      this.mainMenu.defaultOptions.push(adminMenu);
    }

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ]

  }

  goTo($event: any):void{
    //para navegar a una ruta pasandole parametros
    this.router.navigate(['/', 'favorites'], {
      queryParams: {
        key1:'value1',
        key2:'value2',
        key3:'value3'
      }
    });
    console.log($event);
  }

  logout(){
    this.cookie.delete('token');
    this.cookie.delete('role');
    this.router.navigate(['auth']);
  }
}
