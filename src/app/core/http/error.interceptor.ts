import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.error('Global HTTP Error:', error);
        alert('Wystąpił problem z zapytaniem sieciowym.'); // Informacja dla użytkownika
        return throwError(() => new Error('HTTP Request failed.'));
      })
    );
  }
}
