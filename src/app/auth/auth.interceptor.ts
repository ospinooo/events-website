import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

/**
 * Implement the http interceptor.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) { } // DI

  /**
   *
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvc3Bpbm8iLCJpYXQiOjE1ODk1MzY2ODAsImV4cCI6MTU4OTU0MDI4MH0.u5mtJ2C85v3_KcCRg06t0xa-IMyLWS2wDWYMqiITiybiU8fWWGfxgThoNtw6aOuntNrEsGFDK6mYeDh0OUk45g"; // Get the request from the storage.
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) }); // Set headers
    }
    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];
