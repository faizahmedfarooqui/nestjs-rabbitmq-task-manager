/**
 * Tasks Controller
 *
 * This controller is responsible for handling incoming gRPC requests.
 * It uses the TasksService to handle the business logic for the requests.
 */

import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto, UpdateTaskDto, ListTaskDto, DeleteTaskDto,
  ListAllTasksDto
} from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @GrpcMethod('TaskManager', 'CreateTask')
  async createTask(data: CreateTaskDto) {
    return this.tasksService.createTask(data);
  }

  @GrpcMethod('TaskManager', 'ListAllTasks')
  async listAllTasks(data: ListAllTasksDto) {
    return this.tasksService.listAllTasks(data);
  }

  @GrpcMethod('TaskManager', 'ListTask')
  async listTask(data: ListTaskDto) {
    return this.tasksService.listTask(data.id);
  }

  @GrpcMethod('TaskManager', 'UpdateTask')
  async updateTask(data: UpdateTaskDto) {
    return this.tasksService.updateTask(data.id, data);
  }

  @GrpcMethod('TaskManager', 'DeleteTask')
  async deleteTask(data: DeleteTaskDto) {
    return this.tasksService.deleteTask(data.id);
  }
}
