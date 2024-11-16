import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/media';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Observable, map } from 'rxjs';
import { Data, Response } from '../models/response.model';


@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractService<Product> {
  endpoints = {
    product: () => 'product',
    productById: (id: number) => `product/${id}`,
  };

  createProduct(product: Product): Observable<Response<Product>> {
    return this.create(this.endpoints.product(), product)
  }

  updateProduct(product: Product): Observable<Response<Product>> {
    return this.update(this.endpoints.product(), product)
  }

  getProductById(id: number): Observable<Response<Product>> {
    return this.findAll(this.endpoints.productById(id))
  }

  listProducts(args?: any): Observable<Data<Product>> {
    return this.findAll(this.endpoints.product(), 
    args).pipe(
      map((res: Response<Product>) => res.data as Data<Product>)
    );
  }

  deleteProduct(id: number): Observable<Response<any>> {
    return this.delete(this.endpoints.productById(id))
  }
}

