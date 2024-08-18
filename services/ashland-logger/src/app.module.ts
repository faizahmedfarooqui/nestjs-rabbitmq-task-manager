/**
 * Main module for the application.
 *
 * This module imports the LoggerModule and exports the AppModule.
 */

import { Module } from '@nestjs/common';

import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
