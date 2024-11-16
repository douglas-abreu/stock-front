import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if(!sessionStorage.getItem('token')) {
    router.navigate(['/login']);
  };
  return service.checkToken().pipe(
    tap({
      error: () => {
        toastr.warning('Usuário não autenticado!', 'Algo deu errado...');
        router.navigate(['/login']);
      }
    })
  );
};

