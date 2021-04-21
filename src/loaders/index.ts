import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import compression from 'fastify-compress';

const config = new DocumentBuilder()
  .setTitle('MODO QR Generator')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .build();

export function applyLoadersToAppInstance(app: any) {
  /**
   * Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
   */
  app.register(compression, { encodings: ['gzip', 'deflate'] });
  /**
   * Compression can greatly decrease the size of the response body, thereby increasing the speed of a web app.
   */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
