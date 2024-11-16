import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from '../../shared/components/header-home/header-home.component';
import { CategoryService } from '../../shared/services/category.service';
import { Response } from '../../shared/models/response.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../shared/interfaces/media';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
  imports: [
    HeaderHomeComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})

export class CategoryComponent {
  form!: FormGroup;
  category!: any;
  categoryUpdate!: any;
  reloadList: boolean = false;
  isSubmited: boolean = false;


  constructor(
    private service: CategoryService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.categoryUpdate = this.router.getCurrentNavigation()!.extras.state
  }


  ngOnInit(){
    this.createForm();
    this.setFormValues()
  }
  

  createForm(){
    this.form = this.fb.group({
      name: [null, [Validators.required]],
    })
  }

  submitCategory(){
    this.isSubmited = true;
    let category = this.form.getRawValue(); 
    if(this.categoryUpdate){
      category = Object.assign(this.categoryUpdate, category);        
      this.service.updateCategory(category).subscribe({
        next: (res: Response<Category>) => {
          this.toastr.success(res.message);
          this.router.navigate(["/list-category"])
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

    this.service.createCategory(category).subscribe({
      next: (res: Response<Category>) => {
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
    if (this.categoryUpdate) {
      this.form.patchValue(this.categoryUpdate);
    }
  }

}

