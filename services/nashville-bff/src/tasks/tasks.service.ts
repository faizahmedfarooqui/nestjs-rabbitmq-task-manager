/**
 * This service is responsible for handling the communication with the
 * TaskManager microservice.
 *
 * It uses the TaskManagerService to handle the business logic for the requests.
 */

import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { TaskManagerService } from '../interfaces/taskmanager.interface';

@Injectable()
export class TasksService {
  private taskManagerService: TaskManagerService;

  constructor(@Inject('TASK_MANAGER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.taskManagerService = this.client.getService<TaskManagerService>('TaskManager');
  }

  async createTask(title: string, description: string, parentId?: string) {
    return this.taskManagerService.createTask({ title, description, parentId });
  }

  async listAllTasks(page: number = 1, pageSize: number = 10) {
    return this.taskManagerService.listAllTasks({ page, pageSize });
  }

  async listTask(id: string) {
    return this.taskManagerService.listTask({ id });
  }

  async updateTask(id: string, title: string, description: string, parentId?: string) {
    return this.taskManagerService.updateTask({ id, title, description, parentId });
  }

  async deleteTask(id: string) {
    return this.taskManagerService.deleteTask({ id });
  }
}
