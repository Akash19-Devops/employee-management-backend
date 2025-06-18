import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Enable CORS with configuration from environment variables
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || '*',
    methods: configService.get<string>('CORS_METHODS') || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: configService.get<string>('CORS_ALLOWED_HEADERS') || 'Content-Type, Authorization',
    credentials: configService.get<boolean>('CORS_CREDENTIALS') || true,
  });
  
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap();
