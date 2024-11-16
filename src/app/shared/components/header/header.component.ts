import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/media';
import { Response } from '../../models/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {

  user$!: Observable<Response<User>>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  buttons = [
  
    {
      alt: 'Cadastrar Produto',
      title: 'Cadastrar Produto',
      action: () => this.router.navigate(['/product']),
      permission: 1
    },
    {
      alt: 'Cadastrar Categoria',
      title: 'Cadastrar Categoria',
      action: () => this.router.navigate(['/category']),
      permission: 1
    },
    {
      alt: 'Listar Produto',
      title: 'Listar Produto',
      action: () => this.router.navigate(['/list-product']),
      permission: 0
    },
    {
      alt: 'Listar Categorias',
      title: 'Listar Categorias',
      action: () => this.router.navigate(['/list-category']),
      permission: 0
    },
    {
      alt: 'Sair',
      title: 'Sair',
      action: () => this.userService.revokeToken(),
      permission: 0
    },
  ];

 

  ngOnInit() {
    this.user$ = this.userService.userLogged();
  }

}
