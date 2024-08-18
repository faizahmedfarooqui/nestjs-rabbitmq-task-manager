/**
 * This file is the entry point for the application. It is the root
 * module that uses the @Module decorator to define the metadata for
 * the application.
 */

import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
})

export class AppModule {}
