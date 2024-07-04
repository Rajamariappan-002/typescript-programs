"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Class representing the Todo List application
class TodoList {
    constructor() {
        this.todos = [];
        this.nextId = 1;
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
        this.rl.question('Enter your choice: ', (input) => {
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
        this.rl.question('Enter task description: ', (task) => {
            const newTodo = { id: this.nextId++, task, completed: false };
            this.todos.push(newTodo);
            console.log(`Task "${task}" added.`);
            this.displayMenu();
        });
    }
    // Method to mark a task as completed
    completeTask() {
        this.rl.question('Enter task ID to mark as completed: ', (input) => {
            const id = parseInt(input.trim());
            const todo = this.todos.find(todo => todo.id === id);
            if (todo) {
                todo.completed = true;
                console.log(`Task "${todo.task}" marked as completed.`);
            }
            else {
                console.log(`Task with ID ${id} not found.`);
            }
            this.displayMenu();
        });
    }
    // Method to delete a task
    deleteTask() {
        this.rl.question('Enter task ID to delete: ', (input) => {
            const id = parseInt(input.trim());
            const index = this.todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                const deletedTask = this.todos.splice(index, 1)[0];
                console.log(`Task "${deletedTask.task}" deleted.`);
            }
            else {
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
