import { NestFactory } from '@nestjs/core';
//import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  // const config = new DocumentBuilder()
  //   .setTitle('Sistema Colector de Desechos Solidos')
  //   .setDescription('Api del sistema para la recoleccion eficiente de desechos solidos')
  //   .setVersion('1.0')
  //   .addTag('CDS')
  //   .addBearerAuth()
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
