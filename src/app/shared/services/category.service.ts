import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/interfaces/media';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Observable, map } from 'rxjs';
import { Data, Response } from '../models/response.model';


@Injectable({
  providedIn: 'root',
})
export class CategoryService extends AbstractService<Category> {
  endpoints = {
    category: () => 'category',
    categoryById: (id: number) => `category/${id}`,
  };

  createCategory(category: Category): Observable<Response<Category>> {
    return this.create(this.endpoints.category(), category)
  }

  updateCategory(category: Category): Observable<Response<Category>> {
    return this.update(this.endpoints.category(), category)
  }

  getCategoryById(id: number): Observable<Response<Category>> {
    return this.findAll(this.endpoints.categoryById(id))
  }

  listCategorys(args?: any): Observable<Data<Category>> {
    return this.findAll(this.endpoints.category(), 
    args).pipe(
      map((res: Response<Category>) => res.data as Data<Category>)
    );
  }

  deleteCategory(id: number): Observable<Response<any>> {
    return this.delete(this.endpoints.categoryById(id))
  }
}

