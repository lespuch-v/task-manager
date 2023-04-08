import { Component, OnInit } from '@angular/core';
import { Task } from 'src/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  score = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks))
  }

  triggerConfetti(): void {
    this.score += 10;
    const confettiSettings = { target: 'confetti-canvas', size: 1 };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => {
      confetti.clear();
    }, 2000);
  }

  newTaskTitle = '';

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: this.newTaskTitle.trim(),
        completed: false,
      };

      this.taskService.createTask(newTask).subscribe((task) => {
        this.tasks.push(task);
        this.newTaskTitle = '';
      });
    }
  }


  addSubtask(task: Task): void {
    if (task.newSubtaskTitle && task.newSubtaskTitle.trim()) {
      const newSubtask: Task = {
        id: task.subtasks ? task.subtasks.length + 1 : 1,
        title: task.newSubtaskTitle.trim(),
        completed: false,
      };

      if (task.subtasks) {
        task.subtasks.push(newSubtask);
      } else {
        task.subtasks = [newSubtask];
      }

      this.taskService.updateTask(task).subscribe(() => {
        task.newSubtaskTitle = '';
      });
    }
  }

  editTask(task: Task): void {
    task.editing = true;
  }

  finishEditing(task: Task): void {
    task.editing = false;
    this.taskService.updateTask(task).subscribe();
  }

  getSubtaskCompletionPercentage(subtasks: Task[]): number {
    const completedSubtasks = subtasks.filter(
      (subtask) => subtask.completed
    ).length;
    return (completedSubtasks / subtasks.length) * 100;
  }

  deleteTask(taskToDelete: Task): void {
    this.taskService.deleteTask(taskToDelete.id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task !== taskToDelete);
    });
  }
}
