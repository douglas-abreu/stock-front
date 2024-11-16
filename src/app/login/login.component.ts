import { Component } from '@angular/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { HeaderHomeComponent } from "../shared/components/header-home/header-home.component";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
]
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitLogin(){
    this.userService.login(this.form.value).subscribe({
      error: (err) => {}
    })
  }

}
