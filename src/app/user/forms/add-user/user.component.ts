import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../../shared/interfaces/media';
import { UserService } from '../../../shared/services/user.service';
import { Response } from '../../../shared/models/response.model';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from 'src/app/shared/components/header-home/header-home.component';

@Component({
    standalone: true,
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.sass'],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      HeaderHomeComponent
    ]
})
export class UserComponent {
    form!: FormGroup;

    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private toastr: ToastrService,
    ) {}


    ngOnInit(): void {
      this.createForm();
    }

    createForm() {
      this.form = this.fb.group(
        {
          username: ['', [Validators.required]],
          password: ['', [Validators.required]],
        }
      );
    }

    resetForm() {
      this.form.reset();
    }

    submitUser() {
      let user = this.form.getRawValue();
      user.permission = {id: 2, name: "usuario"}

      this.userService.createUser(user)
      .subscribe({
        next: (res: Response<User>) => {
          user = res.data;
          let message = res.message!;
          this.resetForm();
          this.toastr.success(message);
        },
        error: (res: any) => {
          if (res.error.message)
            this.toastr.error(res.error.message, "Erro!");
          else
            this.toastr.warning("Tente novamente mais tarde!", "Algo deu errado...");
        }
      });
    }
}
