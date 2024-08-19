/**
 * Tasks Controller Test
 *
 * This test file is responsible for testing the TasksController.
 * It uses the TasksService to mock the business logic for the requests.
 *
 * The test cases are:
 * 1. It should call createTask on tasksService with correct data and match the response
 * 2. It should call listAllTasks on tasksService with correct data and match the response
 * 3. It should call listTask on tasksService with correct id and match the response
 * 4. It should call updateTask on tasksService with correct data and match the response
 * 5. It should call deleteTask on tasksService with correct id and match the response
 *
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {
  CreateTaskDto, ListAllTasksDto, ListTaskDto, UpdateTaskDto, DeleteTaskDto
} from './dto/task.dto';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;
  let createdTaskId: string;

  // Before each test, initialise the module with the TasksController and a mock TasksService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            createTask: jest.fn().mockResolvedValue({ id: 'some-id', title: 'some-title', description: 'some-description' }),
            listAllTasks: jest.fn().mockResolvedValue([{ id: 'some-id', title: 'some-title', description: 'some-description' }]),
            listTask: jest.fn().mockResolvedValue({ id: 'some-id', title: 'some-title', description: 'some-description' }),
            updateTask: jest.fn().mockResolvedValue({ id: 'some-id', title: 'updated-title', description: 'updated-description' }),
            deleteTask: jest.fn().mockResolvedValue({ id: 'some-id' }),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  // Test Case for createTask
  it('should call createTask on tasksService with correct data and match the response', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'some-title',
      description: 'some-description'
    };

    const result = await tasksController.createTask(createTaskDto);
    createdTaskId = result.id;

    expect(tasksService.createTask).toHaveBeenCalledWith(createTaskDto);
    expect(result).toEqual({ id: 'some-id', title: 'some-title', description: 'some-description' });
  });

  // Test Case for listAllTasks
  it('should call listAllTasks on tasksService with correct data and match the response', async () => {
    const listAllTasksDto: ListAllTasksDto = { page: 1, pageSize: 20 };
    const result = await tasksController.listAllTasks(listAllTasksDto);
    expect(tasksService.listAllTasks).toHaveBeenCalledWith(listAllTasksDto);
    expect(result).toEqual([{ id: 'some-id', title: 'some-title', description: 'some-description' }]);
  });

  // Test Case for listTask
  it('should call listTask on tasksService with correct id and match the response', async () => {
    const listTaskDto: ListTaskDto = { id: createdTaskId };
    const result = await tasksController.listTask(listTaskDto);
    expect(tasksService.listTask).toHaveBeenCalledWith(createdTaskId);
    expect(result).toEqual({ id: 'some-id', title: 'some-title', description: 'some-description' });
  });

  // Test Case for updateTask
  it('should call updateTask on tasksService with correct data and match the response', async () => {
    const updateTaskDto: UpdateTaskDto = { id: createdTaskId, title: 'updated-title', description: 'updated-description' };
    const result = await tasksController.updateTask(updateTaskDto);
    expect(tasksService.updateTask).toHaveBeenCalledWith(createdTaskId, updateTaskDto);
    expect(result).toEqual({ id: 'some-id', title: 'updated-title', description: 'updated-description' });
  });

  // Test Case for deleteTask
  it('should call deleteTask on tasksService with correct id and match the response', async () => {
    const deleteTaskDto: DeleteTaskDto = { id: createdTaskId };
    const result = await tasksController.deleteTask(deleteTaskDto);
    expect(tasksService.deleteTask).toHaveBeenCalledWith(createdTaskId);
    expect(result).toEqual({ id: 'some-id' });
  });
});