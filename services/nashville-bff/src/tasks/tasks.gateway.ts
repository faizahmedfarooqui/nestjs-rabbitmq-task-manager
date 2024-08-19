/**
 * Tasks Gateway for handling WebSocket connections
 *
 * This gateway is responsible for handling the WebSocket connections for the Tasks module.
 * It uses the TasksService to handle the business logic for the requests.
 *
 * The gateway listens for the following events:
 * - createTask: Creates a new task
 * - listAllTasks: Lists all tasks
 * - listTask: Lists a specific task
 * - updateTask: Updates a specific task
 * - deleteTask: Deletes a specific task
 */

import {
  WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { firstValueFrom } from 'rxjs';
import { TasksService } from './tasks.service';

@WebSocketGateway()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly tasksService: TasksService) {}

  @SubscribeMessage('createTask')
  async handleCreateTask(@MessageBody() data: { title: string, description: string, parentId?: string }): Promise<void> {
    const result = await firstValueFrom(
      await this.tasksService.createTask(data.title, data.description, data.parentId)
    );

    this.server.emit('createTask', result);
  }

  @SubscribeMessage('listAllTasks')
  async handleListAllTasks(@MessageBody() data: { page: number, pageSize: number }): Promise<void> {
    const result = await firstValueFrom(
      await this.tasksService.listAllTasks(data.page, data.pageSize)
    );

    this.server.emit('listAllTasks', result);
  }

  @SubscribeMessage('listTask')
  async handleListTask(@MessageBody() data: { id: string }): Promise<void> {
    const result = await firstValueFrom(
      await this.tasksService.listTask(data.id)
    );

    this.server.emit('listTask', result);
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTask(@MessageBody() data: { id: string, title: string, description: string, parentId?: string }): Promise<void> {
    const result = await firstValueFrom(
      await this.tasksService.updateTask(data.id, data.title, data.description, data.parentId)
    );

    this.server.emit('updateTask', result);
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(@MessageBody() data: { id: string }): Promise<void> {
    const result = await firstValueFrom(
      await this.tasksService.deleteTask(data.id)
    );

    this.server.emit('deleteTask', result);
  }
}