import {CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException} from '@nestjs/common';
import {catchError, Observable, timeout, TimeoutError, throwError} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(300000), catchError(err => {
      if (err instanceof TimeoutError) {
        return throwError(new RequestTimeoutException());
      }
      return throwError(err);
    }));
  }
}
