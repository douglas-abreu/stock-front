import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';

import { Product } from '../../shared/interfaces/media'; 
import { ProductService } from '../../shared/services/product.service'; 
import { Data, Response } from '../../shared/models/response.model';
import { TableComponent } from '../../shared/components/table/table.component';
import { PaginationComponent } from '../../shared/components/table/pagination/pagination.component';
import { PageSizeComponent } from '../../shared/components/table/page-size/page-size.component';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../shared/components/header-home/header-home.component';
import { FilterGeneralComponent } from '../../shared/components/filter-general/filter-general.component';
import { UserService } from '../../shared/services/user.service';

@Component({
  standalone: true,
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.sass'],
  imports: [
    CommonModule,
    TableComponent,
    PaginationComponent, 
    HeaderHomeComponent,
    PageSizeComponent,
    FilterGeneralComponent
  ]
})
export class ListProductComponent implements OnInit {
  products$!: Observable<Data<Product>>;
  user$!: Observable<Response<Product>>;
  pageSize: number = 10;
  params: any = {};
  filter: any = {};

  constructor(
    private service: ProductService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listProducts({ size: 10, page: 0 });
    this.getLoggedUser();
  }

  getLoggedUser(){
    this.user$ = this.userService.userLogged();
  }

  listProducts(pagination?: { size?: number; page?: number }, filter?: any) {
    this.params = { ...this.params, ...pagination, ...filter };
    this.products$ = this.service.listProducts(this.params);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.listProducts({ size, page: 0 });
  }

  changePage(page: number) {
    this.listProducts({ page });
  }
  
  applyFilter(filter: any) {
    this.params = {size: this.params.size, page: this.params.page};
    this.filter = filter;
    this.listProducts(filter);
  }

  editEntity(product: Product) {
    this.router.navigateByUrl('/product', { state: product });
  }

  deleteEntity(id: number) {
    this.service.deleteProduct(id).subscribe({
      next: (res: Response<Product> | null) => {
        if (res !== null) {
          this.toastr.success(res.message);
          this.listProducts();
        }
      },
      error: (res: any) => {
        if (res.error.status == 401)
          return
        else if (res.error.message) this.toastr.error(res.error.message, 'Erro!');
        else
          this.toastr.warning(
            'Tente novamente mais tarde!',
            'Algo deu errado...'
          );
      },
    });
  }

}
