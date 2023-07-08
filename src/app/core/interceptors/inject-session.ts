// export interface InjectSession {
// }

import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {CookieService} from 'ngx-cookie-service';


@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {
    constructor(private coockie: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        try {
            //console.log('INTRCEPTOR', req);
            const token = this.coockie.get('token');
            let newRequest = req;
            newRequest = req.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`,
                    custom_header: 'HOLA SOY UN NUEVO ENCABEZADO'
                }
            })
            return next.handle(newRequest);
        } catch (error) {
            console.log('INTERECEPTOR: ERROR', Error)
            return next.handle(req);
        }
    }
}
