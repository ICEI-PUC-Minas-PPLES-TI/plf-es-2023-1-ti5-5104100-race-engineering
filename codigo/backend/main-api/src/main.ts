import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { enableSwaggerConfig } from '@/common/config/enable-swagger.config';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.set('trust proxy', 1);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  enableSwaggerConfig(app);

  await app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port} 🚀`);
  });
}

bootstrap();
