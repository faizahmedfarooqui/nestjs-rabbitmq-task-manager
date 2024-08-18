/**
 * Data Transfer Object (DTO) for Task
 *
 * This file defines the data transfer objects (DTOs) for the Task entity.
 */
export class CreateTaskDto {
	parentId?: string;
	title: string;
	description: string;
}

export class ListTaskDto {
	id: string;
}

export class ListAllTasksDto {
	page: number;
	pageSize: number;
}

export class UpdateTaskDto {
	id?: string;
	title?: string;
	description?: string;
	parentId?: string;
}

export class DeleteTaskDto {
	id: string;
}
