import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * Configure Swagger documentation for the application
 * @param app NestJS application instance
 */
export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('IT Forum API')
    .setDescription('The IT Forum API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}; 