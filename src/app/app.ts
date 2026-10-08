import { Component, inject, OnInit, signal } from '@angular/core';
import { Todo, TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly todoService = inject(TodoService);
  protected readonly todos = signal<Todo[]>([]);

  ngOnInit() {
    this.load();
  }

  load() {
    this.todoService.getAll().subscribe(todos => this.todos.set(todos));
  }

  add(input: HTMLInputElement) {
    const title = input.value.trim();
    if (!title) return;
    this.todoService.create(title).subscribe(() => {
      input.value = '';
      this.load();
    });
  }

  toggle(todo: Todo) {
    this.todoService.update({ ...todo, isDone: !todo.isDone }).subscribe(() => this.load());
  }

  remove(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(() => this.load());
  }
}
