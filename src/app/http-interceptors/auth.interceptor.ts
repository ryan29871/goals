import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { StorageService } from '../services/storage.service';

@Injectable()
export class BearerAuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    return from(this.storageService.get('accesstoken'))
      .pipe(
        mergeMap(accesstoken => {
          console.log(accesstoken);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accesstoken}`
            }
          });
          return next.handle(request);
        })
      );
  }

}
