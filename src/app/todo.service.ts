import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: string;
}

// ng serve -> API locale ; ng build -> API déployée sur Azure
const apiUrl = 'https://demo-ci-cd-d5d4a3bec4f9hgfm.swedencentral-01.azurewebsites.net/api/todos'

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<Todo[]>(apiUrl);
  }

  create(title: string) {
    return this.http.post<Todo>(apiUrl, { title });
  }

  update(todo: Todo) {
    return this.http.put<void>(`${apiUrl}/${todo.id}`, todo);
  }

  delete(id: number) {
    return this.http.delete<void>(`${apiUrl}/${id}`);
  }
}
