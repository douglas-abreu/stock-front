import { Injectable, inject } from '@angular/core';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { Data, Response } from '../../shared/models/response.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/media';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractService<User> {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  endpoints = {
    userCreate: () => 'user/create',
    userById: (id: number) => `user/${id}`,
    login: () => 'authentication/login',
    checkToken: () => 'authentication/token',
    checkUser: () => 'authentication/check',
  };

  createUser(user: User): Observable<Response<User>> {
    return this.create(this.endpoints.userCreate(), user);
  }

  getUserById(id: number): Observable<User> {
    return this.findAll(this.endpoints.userById(id)).pipe(
      map((res: Response<User>) => res.data as User)
    );
  }

  login(user: User): Observable<any> {
    return this.create(this.endpoints.login(), user).pipe(
      tap((res: any) => {
        res = res.data
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem(
          'user',
          JSON.stringify({
            login: res.username,
            name: res.name,
            permission: res.permission,
          })
        );
        this.toastr.success('Login realizado com sucesso!');

        this.router.navigate(['/list-product']) 
      }),
      catchError((err):any => {
        if (err.error.message) this.toastr.error(err.error.message);
        else 
          this.toastr.warning( 
            'Tente novamente mais tarde!',
            'Algo deu errado...'
          );
      })
    );
  }

  checkToken(): Observable<boolean> {
    return this.httpClient
      .get<boolean>(`${environment.api}${this.endpoints.checkToken()}`, {
        params:  {token: sessionStorage.getItem('token')!}
      });
  }

  getUserPermission(): string {
    let user = JSON.parse(sessionStorage.getItem('user')!);
    return user.permission.name;
  }

  revokeToken() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  userLogged(): Observable<Response<User>> {
    return this.findAll(this.endpoints.checkUser());
  }
}
