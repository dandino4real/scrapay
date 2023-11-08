
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

// app.useGlobalPipes(new ValidationPipe())

//   await app.listen(3001);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(), // Use Express adapter
  );

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  // Enable CORS for all origins (for development purposes)
  app.enableCors();

  // Set global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  Logger.log(`Server started on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
