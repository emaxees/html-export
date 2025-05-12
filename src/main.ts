import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para permitir solicitudes desde cualquier origen
  app.enableCors();
  
  // Configurar el prefijo global para todas las rutas
  app.setGlobalPrefix('api');
  
  // Usar el puerto proporcionado por el entorno o 3000 como predeterminado
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  logger.log(`Aplicación ejecutándose en: http://localhost:${port}`);
}
bootstrap();
