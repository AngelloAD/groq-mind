import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adaptado para producción: Permite localhost en desarrollo y tu futura URL de Vercel
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Mantenemos tu tubería de validación intacta
  app.useGlobalPipes(new ValidationPipe());

  // Adaptado para Vercel: Usa el puerto que te asigne la plataforma o el 3000 en local
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
