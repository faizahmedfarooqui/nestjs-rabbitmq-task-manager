/**
 * Logger Controller Test
 *
 * This test suite is responsible for testing the LoggerController class.
 *
 * The test cases are:
 * 1. It should log task created message
 * 2. It should log task updated message
 * 3. It should log task deleted message
 *
 */

import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';
import { Test, TestingModule } from '@nestjs/testing';

// Describe the test suite for LoggerController
describe('LoggerController', () => {
  let loggerController: LoggerController;
  let loggerService: LoggerService;

  // Before each test, initialize the LoggerService and LoggerController
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggerController],
      providers: [LoggerService],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
    loggerController = module.get<LoggerController>(LoggerController);
  });

  // Describe the test suite for the handleTaskCreated method
  describe('handleTaskCreated', () => {
    it('should log task created message', () => {
      const data = { id: '1', title: 'Test Task' };

      jest.spyOn(loggerService, 'log');

      loggerController.handleTaskCreated(data);

      expect(loggerService.log).toHaveBeenCalledWith('Task Created: ' + JSON.stringify(data));
    });
  });

  // Describe the test suite for the handleTaskUpdated method
  describe('handleTaskUpdated', () => {
    it('should log task updated message', () => {
      const data = { id: '1', title: 'Updated Task' };

      jest.spyOn(loggerService, 'log');

      loggerController.handleTaskUpdated(data);

      expect(loggerService.log).toHaveBeenCalledWith('Task Updated: ' + JSON.stringify(data));
    });
  });

  // Describe the test suite for the handleTaskDeleted method
  describe('handleTaskDeleted', () => {
    it('should log task deleted message', () => {
      const data = { id: '1', title: 'Deleted Task' };

      jest.spyOn(loggerService, 'log');

      loggerController.handleTaskDeleted(data);

      expect(loggerService.log).toHaveBeenCalledWith('Task Deleted: ' + JSON.stringify(data));
    });
  });
});