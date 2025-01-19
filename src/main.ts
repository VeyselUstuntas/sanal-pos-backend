import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sanal Pos')
    .setDescription('Sanal Pos API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha', // Tag'leri alfabetik sıraya göre sıralar
      operationsSorter: 'alpha', // Operasyonları alfabetik sıraya göre sıralar
      persistAuthorization: true, // Yetkilendirmeyi saklar
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
