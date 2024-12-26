import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

interface ResponseInterface<T> {
  status_code: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseInterface<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterface<T>> {
    return next.handle().pipe(
      map((response) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        let message =
          statusCode === 200 || statusCode === 201 ? 'Successfully' : undefined;
        let data = response?.data ?? response;
        if (response && response.message) {
          message = response.message;
          delete data.message;
        }
        if (data === null || (data && isEmptyObject(data))) {
          data = undefined;
        }
        return {
          status_code: statusCode,
          message,
          data,
        };
      }),
    );
  }
}

function isEmptyObject(obj = {}) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
