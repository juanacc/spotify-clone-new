import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInSession: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
