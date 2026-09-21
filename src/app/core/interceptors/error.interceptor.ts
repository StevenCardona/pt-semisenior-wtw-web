import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ToastService } from '@core/services/toast.service';
import { ApiResponse } from '@shared/models/api-response.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error as ApiResponse<unknown> | undefined;
      const message = apiError?.messages?.[0] ?? 'Ocurrió un error.';
      toast.show(message);
      return throwError(() => error);
    }),
  );
};
