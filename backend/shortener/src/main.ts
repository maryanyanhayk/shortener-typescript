import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as serveStatic from 'serve-static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve static files from a 'public' directory
  app.use(serveStatic(path.join(__dirname, '..', 'public')));
  

  await app.listen(3000);
}

bootstrap();
