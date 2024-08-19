/**
 * Tasks Controller Test
 *
 * This test file is responsible for testing the TasksController.
 * It uses the TasksService to mock the business logic for the requests.
 *
 * The test cases are:
 * 1. It should call createTask on tasksService with correct data
 * 2. It should call listAllTasks on tasksService with correct page and pageSize
 * 3. It should call listTask on tasksService with correct id
 * 4. It should call updateTask on tasksService with correct data
 * 5. It should call deleteTask on tasksService with correct id
 *
 */

import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { of } from 'rxjs';
import { lastValueFrom } from 'rxjs';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  // Before each test, initialise the module with the TasksController and a mock TasksService
  beforeEach(async () => {
    const mockTasksService = {
      createTask: jest.fn(),
      listAllTasks: jest.fn(),
      listTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  // Test Case for createTask
  describe('createTask', () => {
    it('should call createTask on tasksService with correct data', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        parentId: null
      };
      const mockResponse = {
        id: 'some-id',
        ...createTaskDto
      };

      jest.spyOn(tasksService, 'createTask').mockReturnValue(Promise.resolve(of(mockResponse)));

      const result = await lastValueFrom(
        await tasksController.createTask(createTaskDto)
      );
      expect(tasksService.createTask).toHaveBeenCalledWith(createTaskDto.title, createTaskDto.description, createTaskDto.parentId);
      expect(result).toEqual(mockResponse);
    });
  });

  // Test Case for listAllTasks
  describe('listAllTasks', () => {
    it('should call listAllTasks on tasksService with correct page and pageSize', async () => {
      const mockResponse = [{
        id: 'some-id',
        title: 'Test Task',
        description: 'Test Description'
      }];

      jest.spyOn(tasksService, 'listAllTasks').mockReturnValue(Promise.resolve(of(mockResponse)));

      const result = await lastValueFrom(
        await tasksController.listAllTasks(1, 10)
      );
      expect(tasksService.listAllTasks).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(mockResponse);
    });
  });

  // Test Case for listTask
  describe('listTask', () => {
    it('should call listTask on tasksService with correct id', async () => {
      const mockResponse = {
        id: 'some-id',
        title: 'Test Task',
        description: 'Test Description'
      };

      jest.spyOn(tasksService, 'listTask').mockReturnValue(Promise.resolve(of(mockResponse)));

      const result = await lastValueFrom(
        await tasksController.listTask('some-id')
      );
      expect(tasksService.listTask).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockResponse);
    });
  });

  // Test Case for updateTask
  describe('updateTask', () => {
    it('should call updateTask on tasksService with correct data', async () => {
      const updateTaskDto = {
        id: 'some-id',
        title: 'Updated Task',
        description: 'Updated Description',
        parentId: 'parent-id'
      };
      const mockResponse = {
        id: 'some-id',
        ...updateTaskDto
      };
      jest.spyOn(tasksService, 'updateTask').mockReturnValue(Promise.resolve(of(mockResponse)));

      const result = await lastValueFrom(
        await tasksController.updateTask(updateTaskDto.id, updateTaskDto)
      );
      expect(tasksService.updateTask).toHaveBeenCalledWith(
        updateTaskDto.id,
        updateTaskDto.title,
        updateTaskDto.description,
        updateTaskDto.parentId
      );
      expect(result).toEqual(mockResponse);
    });
  });

  // Test Case for deleteTask
  describe('deleteTask', () => {
    it('should call deleteTask on tasksService with correct id', async () => {
      const mockResponse = { id: 'some-id' };
      jest.spyOn(tasksService, 'deleteTask').mockReturnValue(Promise.resolve(of(mockResponse)));

      const result = await lastValueFrom(
        await tasksController.deleteTask('some-id')
      );
      expect(tasksService.deleteTask).toHaveBeenCalledWith('some-id');
      expect(result).toEqual(mockResponse);
    });
  });
});