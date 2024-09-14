//git config --g --edit             abre la terminal en bim (editor de codigo)
//git add .                         añade todos los archivos y carpetas registro de cambios
//git commit -m "initial commit"    punto de referencia que registra una versión del proyecto
//git remote add origin https://github.com/GaaloP/webDes-gualmar.git    accede al repositorio url
//git branch -M main                accede a la rama main
//git push -u origin main           guarda cambios

//abrir docker desktop
//docker compose up -d    iniciar docker
//npm run start:dev       iniciar el servidor

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(3000);
}
bootstrap();
