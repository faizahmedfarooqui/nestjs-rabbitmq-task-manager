/**
 * Ashland Logger
 *
 * This is a simple logger service that listens to a RabbitMQ queue
 * and logs the messages to the console.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'task_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.listen();
}

bootstrap();
