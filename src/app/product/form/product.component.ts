import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../shared/components/header-home/header-home.component';
import { ProductService } from '../../shared/services/product.service';
import { Data, Response } from '../../shared/models/response.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, Product } from '../../shared/interfaces/media';
import { Observable } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import { Route, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  imports: [
    HeaderHomeComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})

export class ProductComponent {
  form!: FormGroup;
  product!: any;
  productUpdate!: any;
  isSubmited: boolean = false;
  categories$!: Observable<Data<Category>>;

  constructor(
    private service: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productUpdate = this.router.getCurrentNavigation()!.extras.state
  }

  listCategorys(pagination?: { size?: number; page?: number }) {
    this.categories$ = this.categoryService.listCategorys(pagination);
  }


  ngOnInit(){
    this.createForm();
    this.setFormValues();
    this.listCategorys({ size: 10, page: 0 });
  }
  

  createForm(){
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      barCode: [null, [
        Validators.required, Validators.minLength(13)],
      ],
      quantity: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null],
    })
  }

  submitProduct(){
    this.isSubmited = true;
    let product = this.form.getRawValue(); 
    
    let message: string = '';
    if(this.productUpdate){
      product = Object.assign(this.productUpdate, product);
        
      this.service.updateProduct(product).subscribe({
        next: (res: Response<Product>) => {
          this.toastr.success(res.message);
          this.router.navigate(['/list-product']);
        },
        error: (res: any) => {
          this.isSubmited = false;
          if (res.error.status == 401)
            return
          else if (res.error.message)
            this.toastr.error(res.error.message, "Erro!");
          else                      
            this.toastr.warning("Tente novamente mais tarde!", "Algo deu errado...");
        }
      });
      return;
    }

    this.service.createProduct(product).subscribe({
      next: (res: Response<Product>) => {
        this.resetForm();
        this.toastr.success(res.message);
      },
      error: (res: any) => {
        this.isSubmited = false;
        if (res.error.status == 401)
          return
        else if (res.error.message)
          this.toastr.error(res.error.message, "Erro!");
        else
          this.toastr.warning("Tente novamente mais tarde!", "Algo deu errado...");
      }
    });
  }

  resetForm() {
    this.isSubmited = false;
    this.form.reset();
  }

  setFormValues(){
    if (this.productUpdate) {
      this.form.patchValue(this.productUpdate);
    }
  }

}

