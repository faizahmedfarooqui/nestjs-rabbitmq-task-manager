/**
 * Module for the logger service
 *
 * This module provides the LoggerService and LoggerController
 */

import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';

@Module({
  providers: [LoggerService],
  controllers: [LoggerController]
})

export class LoggerModule {}
