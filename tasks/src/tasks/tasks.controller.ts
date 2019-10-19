import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create.task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
      return this.taskService.deleteTask(id);
  }
  @Patch(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
      return this.taskService.updateTaskStatus(id, status);
  }
}
