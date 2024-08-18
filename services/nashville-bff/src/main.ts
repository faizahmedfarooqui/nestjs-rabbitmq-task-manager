/**
 * This is the entry point of the application. It creates an instance
 * of the Nest application and listens on port 3000.
 *
 * The AppModule is imported to provide the application with the necessary
 * dependencies.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
