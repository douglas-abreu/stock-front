import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  private userService = inject(UserService);
  private toastr = inject(ToastrService)

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('token');

    if (token)
       request = request.clone({
         setHeaders: {
           Authorization: `Bearer ${token}`,
         },
       });

    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status == 403 || err.status == 0) 
            this.userService.revokeToken();
          if (err.status == 401)
            this.toastr.error('Usuário não autorizado para está ação', 'Erro!');
        },
      })
    );
  }
}
