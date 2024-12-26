import { Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const result = exception.getResponse();

    const resultData = {
      data: result['data'] ?? undefined,
      message: result['message'] ?? result,
      status_code: status,
    };

    response.status(status).json(resultData);
  }
}
