import { Catch, ExceptionFilter, Logger } from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    let errMessage = 'An unknown Prisma error occurred.';

    if (exception instanceof PrismaClientInitializationError) {
      errMessage = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      errMessage = exception.message;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      errMessage = exception.message;
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      errMessage = exception.message;
    } else if (exception instanceof PrismaClientRustPanicError) {
      errMessage = exception.message;
    } else if (exception instanceof Error) {
      errMessage = exception.message;
    }

    new Logger('PrismaError').error(errMessage);
  }
}
