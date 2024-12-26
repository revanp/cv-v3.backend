import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filter-interceptors/prisma-exception.filter';
import { HttpExceptionFilter } from './common/filter-interceptors/http-exception.filter';
import { ResponseInterceptor } from './common/filter-interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'verbose', 'log'],
  });

  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const logger = new Logger('CV Backend Service');
  await app.listen(process.env.APP_PORT);

  logger.log(`Server is running on: ${await app.getUrl()}`);
}
bootstrap();
