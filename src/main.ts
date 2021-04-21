import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import compression from 'fastify-compress';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 3000;

const swaggerConfig = new DocumentBuilder()
  .setTitle('MODO QR Generator')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .build();

async function bootstrap() {
  const logger = new Logger('main');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  /**
   * Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
   */
  app.register(compression, { encodings: ['gzip', 'deflate'] });
  /**
   * Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
   */
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  /**
   * Init on the specified port
   */
  await app.listen(PORT);
  logger.log(`Nest is up and running in port ${PORT}`);
}

bootstrap();
