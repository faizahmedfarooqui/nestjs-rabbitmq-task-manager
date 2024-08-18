/**
 * Tasks Service
 *
 * This service is responsible for handling the business logic for the tasks.
 * It uses the Task entity to interact with the database.
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import {
  CreateTaskDto, UpdateTaskDto, DeleteTaskDto, ListAllTasksDto
} from './dto/task.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class TasksService {
  private client: ClientProxy;

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'task_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    await this.tasksRepository.save(task);

    // Emit create event to the logger service
    this.client.emit('task-created', task);

    return task;
  }

  async listAllTasks(listAllTasksDto: ListAllTasksDto): Promise<any> {
    const { page, pageSize } = listAllTasksDto;
    const tasks = await this.tasksRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalCount = await this.tasksRepository.count();

    return {
      totalCount,
      tasks
    };
  }

  async listTask(id: string): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id }});
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    const updatedTask = await this.tasksRepository.findOne({ where: { id } });

    // Emit update event to the logger service
    this.client.emit('task-updated', updatedTask);

    return updatedTask;
  }

  async deleteTask(id: string): Promise<DeleteTaskDto> {
    // Emit delete event to the logger service
    this.client.emit('task-deleted', id);

    await this.tasksRepository.delete(id);
    return { id };
  }
}