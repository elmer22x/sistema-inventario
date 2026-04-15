// -----------------------------------------------------------------
// ARCHIVO: main.ts (backend)
// FUNCIÓN: Punto de entrada de la aplicación NestJS
// IMPORTANCIA: Configura CORS para permitir conexiones desde Angular
// -----------------------------------------------------------------

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // HABILITAR CORS - Permite que Angular (puerto 4200) se conecte
  app.enableCors({
    origin: 'http://localhost:4200',  // Solo permite conexiones desde Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Métodos HTTP permitidos
    credentials: true,  // Permite enviar cookies/tokens
  });
  
  await app.listen(3000);
  console.log('Backend corriendo en http://localhost:3000');
}
bootstrap();