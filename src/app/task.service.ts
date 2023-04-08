import { Injectable } from '@angular/core';
import { Task } from 'src/task';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private apiBaseUrl = 'http://localhost:5000/tasks'

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiBaseUrl);
  }

  createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.apiBaseUrl, task);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiBaseUrl}/${taskId}`);
  }

}
