import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const errors = error.error.errors;
              const modelStateErrors = [];
              for (const key in errors) {
                if (errors[key]) {
                  modelStateErrors.push(errors[key])
                }
              }
              throw modelStateErrors.flat();
            } else if (typeof(error.error) === 'object') {
              this.toastr.error(error.statusText, error.status.toString());
            } else {
              this.toastr.error(error.error, error.status.toString());
            }
            break;
          case 401:
            this.toastr.error(error.error, error.status.toString());
            break;
          case 404:
            this.router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras = {state: {error: error.error}};
            this.router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            this.toastr.error('Something unexpected went wrong');
            console.error(error);
            break;
        }
      }
      throw error;
    }));
  }
}
