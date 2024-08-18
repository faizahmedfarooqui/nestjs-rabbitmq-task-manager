/**
 * This file is the entry point for the microservice. It creates a new NestJS application
 * and listens for incoming gRPC requests on port 50051.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',  // Address where this service will listen
      package: 'taskmanager',   // Package name defined in your .proto file
      protoPath: join(__dirname, '../src/proto/taskmanager.proto'), // Path to your .proto file
    },
  });

  await app.listen();
}
bootstrap();
