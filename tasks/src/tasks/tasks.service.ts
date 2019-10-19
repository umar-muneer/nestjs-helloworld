import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v4';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create.task.dto';
@Injectable()
export class TasksService {
  private tasks = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }
  deleteTask(id: string) {
    const index: number = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(index, 1);
  }
  updateTaskStatus(id: string, status: TaskStatus) {
     const task: Task = this.tasks.find(task => task.id === id);
     task.status = status;
     return {...task};
  }
}
