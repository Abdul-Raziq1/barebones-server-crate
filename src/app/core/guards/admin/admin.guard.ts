import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ADMIN } from '../../util/constants';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    authService.userAuthStatus().authenticated &&
    authService.userAuthStatus().role === ADMIN
  ) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
