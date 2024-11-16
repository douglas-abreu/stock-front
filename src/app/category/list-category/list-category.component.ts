import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';

import { Category, User } from '../../shared/interfaces/media'; 
import { CategoryService } from '../../shared/services/category.service'; 
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
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.sass'],
  imports: [
    CommonModule,
    TableComponent,
    PaginationComponent, 
    HeaderHomeComponent,
    PageSizeComponent,
    FilterGeneralComponent
  ]
})
export class ListCategoryComponent implements OnInit {
  categorys$!: Observable<Data<Category>>;
  user$!: Observable<Response<User>>;
  pageSize: number = 10;
  params: any = {};
  filter: any = {};

  constructor(
    private service: CategoryService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listCategorys({ size: 10, page: 0 });
    this.getLoggedUser();
  }

  getLoggedUser(){
    this.user$ = this.userService.userLogged();
  }

  listCategorys(pagination?: { size?: number; page?: number }, filter?: any) {
    this.params = { ...this.params, ...pagination, ...filter };
    this.categorys$ = this.service.listCategorys(this.params);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.listCategorys({ size, page: 0 });
  }

  changePage(page: number) {
    this.listCategorys({ page });
  }
  
  applyFilter(filter: any) {
    this.params = {size: this.params.size, page: this.params.page};
    this.filter = filter;
    this.listCategorys(filter);
  }

  editEntity(category: Category) {
    this.router.navigateByUrl('/category', { state: category });
  }

  deleteEntity(id: number) {
    this.service.deleteCategory(id).subscribe({
      next: (res: Response<Category> | null) => {
        if (res !== null) {
          this.toastr.success(res.message);
          this.listCategorys();
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

  createEntity() {
    this.router.navigate(['/contribuintes/curriculo']);
  }
}
