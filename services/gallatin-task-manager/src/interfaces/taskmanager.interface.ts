import { Observable } from 'rxjs';

import {
  CreateTaskDto, ListAllTasksDto, ListTaskDto, UpdateTaskDto, DeleteTaskDto
} from 'src/tasks/dto/task.dto';

/**
 * TaskManagerService Interface
 *
 * This interface defines the methods that the TaskManagerService should implement.
 */
export interface TaskManagerService {
  createTask(data: CreateTaskDto): Observable<any>;
  listAllTasks(data: ListAllTasksDto): Observable<any>;
  listTask(data: ListTaskDto): Observable<any>;
  updateTask(data: UpdateTaskDto): Observable<any>;
  deleteTask(data: DeleteTaskDto): Observable<any>;
}
