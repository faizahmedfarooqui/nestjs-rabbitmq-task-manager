/**
 * Tasks Module
 *
 * This module is responsible for handling all the tasks related operations.
 * It imports the TypeOrmModule to use the Task entity and the EventEmitterModule.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'task_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})

export class TasksModule {}
