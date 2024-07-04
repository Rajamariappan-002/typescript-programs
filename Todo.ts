import * as readline from 'readline';

// Define an interface for a Todo task
interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

// Class representing the Todo List application
class TodoList {
  private todos: Todo[] = [];
  private nextId: number = 1;
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Initialize the Todo List with some sample tasks
    this.todos.push({ id: this.nextId++, task: 'Learn TypeScript', completed: false });
    this.todos.push({ id: this.nextId++, task: 'Build a Todo List app', completed: true });
  }

  // Method to start the application
  startApp() {
    console.log('Welcome to the Todo List App!');
    this.displayMenu();
  }

  // Method to display menu options
  displayMenu() {
    console.log(`
    === Menu ===
    1. Add Task
    2. Complete Task
    3. Delete Task
    4. View Tasks
    5. Exit
    `);

    this.rl.question('Enter your choice: ', (input: string) => {
      switch (input.trim()) {
        case '1':
          this.addTask();
          break;
        case '2':
          this.completeTask();
          break;
        case '3':
          this.deleteTask();
          break;
        case '4':
          this.viewTasks();
          break;
        case '5':
          this.rl.close();
          console.log('Exiting Todo List App.');
          break;
        default:
          console.log('Invalid choice. Please enter a number from 1 to 5.');
          this.displayMenu();
          break;
      }
    });
  }

  // Method to add a new task
  addTask() {
    this.rl.question('Enter task description: ', (task: string) => {
      const newTodo: Todo = { id: this.nextId++, task, completed: false };
      this.todos.push(newTodo);
      console.log(`Task "${task}" added.`);
      this.displayMenu();
    });
  }

  // Method to mark a task as completed
  completeTask() {
    this.rl.question('Enter task ID to mark as completed: ', (input: string) => {
      const id = parseInt(input.trim());
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
        console.log(`Task "${todo.task}" marked as completed.`);
      } else {
        console.log(`Task with ID ${id} not found.`);
      }
      this.displayMenu();
    });
  }

  // Method to delete a task
  deleteTask() {
    this.rl.question('Enter task ID to delete: ', (input: string) => {
      const id = parseInt(input.trim());
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        const deletedTask = this.todos.splice(index, 1)[0];
        console.log(`Task "${deletedTask.task}" deleted.`);
      } else {
        console.log(`Task with ID ${id} not found.`);
      }
      this.displayMenu();
    });
  }

  // Method to view all tasks
  viewTasks() {
    console.log('=== Todo List ===');
    this.todos.forEach(todo => {
      const status = todo.completed ? '[X]' : '[ ]';
      console.log(`${status} ${todo.id}. ${todo.task}`);
    });
    this.displayMenu();
  }
}

// Create an instance of TodoList and start the application
const todoList = new TodoList();
todoList.startApp();
