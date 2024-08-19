/**
 * This file is used to define the TasksModule. This module is used to define the
 * tasks related operations. It imports the ClientsModule and the TasksController
 * and TasksService classes.
 */

import { join } from 'path';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_MANAGER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'taskmanager',
          protoPath: join(__dirname, '../../src/proto/taskmanager.proto'),
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})

export class TasksModule {}
