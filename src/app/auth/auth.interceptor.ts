import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

/**
 * Implement the http interceptor.
 * - Intercept the HttpRequest we are sending with the angular app and to something with it.
 * - In this case we will use to add the Baerer TOKEN.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) { } // DI

  /**
   *
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) }); // Set headers
    }
    return next.handle(authReq);
  }
}


// Export the provider
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
