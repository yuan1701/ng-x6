import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // 统一添加token
    const resetReq = request.clone({
      setHeaders: {
        Authorization: 'Amazing_039sssssssssssssssssssssssssssssssss',
      },
    });

    return next.handle(resetReq);
  }
}
