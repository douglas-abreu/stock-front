import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Response } from './../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AbstractService<T> {
  private http = inject(HttpClient);

  protected findAll(endpoint: string, params?: any): Observable<Response<T>> {
    return this.http.get<Response<T> | any>(`${environment.api}${endpoint}`, {
      params,
    });
  }

  protected create(
    endpoint: string,
    resource: Partial<T>
  ): Observable<Response<T>> {
    return this.http.post<Response<T>>(
      `${environment.api}${endpoint}`,
      resource
    );
  }

  protected update(
    endpoint: string,
    resource: Partial<T>
  ): Observable<Response<T>> {
    return this.http.put<Response<T>>(
      `${environment.api}${endpoint}`,
      resource
    );
  }

  protected delete(endpoint: string): Observable<Response<T>> {
    return this.http.delete<Response<T>>(`${environment.api}${endpoint}`);
  }

  protected patch(
    endpoint: string,
    resource: Partial<T>
  ): Observable<Response<T>> {
    return this.http.patch<Response<T>>(
      `${environment.api}${endpoint}`,
      resource
    );
  }

  
}
