/**
 * Tasks Controller
 *
 * This controller is responsible for handling incoming HTTP requests.
 * It uses the TasksService to handle the business logic for the requests.
 */

import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<any> {
    const { title, description, parentId } = createTaskDto;
    return this.tasksService.createTask(title, description, parentId);
  }

  @Get()
  async listAllTasks(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10
  ): Promise<any> {
    return this.tasksService.listAllTasks(page, pageSize);
  }

  @Get(':id')
  async listTask(@Param('id') id: string): Promise<any> {
    return this.tasksService.listTask(id);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<any> {
    const { title, description, parentId } = updateTaskDto;
    return this.tasksService.updateTask(id, title, description, parentId);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<any> {
    return this.tasksService.deleteTask(id);
  }
}
