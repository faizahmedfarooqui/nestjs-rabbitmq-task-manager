/**
 * Logger Controller
 *
 * This controller listens for events from the task service
 * and relays them to the Logger Service.
 */

import { Controller } from '@nestjs/common';
import { LoggerService } from './logger.service';
import {
  EventPattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class LoggerController {
  constructor(private readonly service: LoggerService) {}

  @EventPattern('task-created')
  handleTaskCreated(@Payload() data: any) {
    this.service.log('Task Created: ' + JSON.stringify(data));
  }

  @EventPattern('task-updated')
  handleTaskUpdated(@Payload() data: any) {
    this.service.log('Task Updated: ' + JSON.stringify(data));
  }

  @EventPattern('task-deleted')
  handleTaskDeleted(@Payload() data: any) {
    this.service.log('Task Deleted: ' + JSON.stringify(data));
  }
}