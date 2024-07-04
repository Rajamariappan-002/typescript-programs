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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Class representing the Student Grade application
class StudentGradeApp {
    constructor() {
        this.students = [];
        this.nextId = 1;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    // Method to start the application
    startApp() {
        console.log('Welcome to the Student Grade App!');
        this.displayMenu();
    }
    // Method to display menu options
    displayMenu() {
        console.log(`
    === Menu ===
    1. Add Student
    2. Enter Grades
    3. Calculate Average Grade
    4. Display Students
    5. Exit
    `);
        this.rl.question('Enter your choice: ', (input) => {
            switch (input.trim()) {
                case '1':
                    this.addStudent();
                    break;
                case '2':
                    this.enterGrades();
                    break;
                case '3':
                    this.calculateAverageGrade();
                    break;
                case '4':
                    this.displayStudents();
                    break;
                case '5':
                    this.rl.close();
                    console.log('Exiting Student Grade App.');
                    break;
                default:
                    console.log('Invalid choice. Please enter a number from 1 to 5.');
                    this.displayMenu();
                    break;
            }
        });
    }
    // Method to add a new student
    addStudent() {
        this.rl.question('Enter student name: ', (name) => {
            const newStudent = { id: this.nextId++, name, grades: [] };
            this.students.push(newStudent);
            console.log(`Student "${name}" added with ID ${newStudent.id}.`);
            this.displayMenu();
        });
    }
    // Method to enter grades for a student
    enterGrades() {
        return __awaiter(this, void 0, void 0, function* () {
            const idInput = yield this.askQuestion('Enter student ID to enter grades: ');
            const id = parseInt(idInput.trim());
            const student = this.students.find(student => student.id === id);
            if (!student) {
                console.log(`Student with ID ${id} not found.`);
                this.displayMenu();
                return;
            }
            const gradesInput = yield this.askQuestion(`Enter grades for ${student.name} (comma-separated): `);
            const grades = gradesInput.split(',').map(grade => parseFloat(grade.trim()));
            student.grades = grades;
            console.log(`Grades entered for ${student.name}.`);
            this.displayMenu();
        });
    }
    // Method to calculate average grade for a student
    calculateAverageGrade() {
        this.rl.question('Enter student ID to calculate average grade: ', (input) => {
            const id = parseInt(input.trim());
            const student = this.students.find(student => student.id === id);
            if (student) {
                const averageGrade = this.calculateAverage(student);
                console.log(`Average grade for ${student.name}: ${averageGrade.toFixed(2)}`);
            }
            else {
                console.log(`Student with ID ${id} not found.`);
            }
            this.displayMenu();
        });
    }
    // Method to calculate average grade for a student
    calculateAverage(student) {
        const sum = student.grades.reduce((total, grade) => total + grade, 0);
        return student.grades.length > 0 ? sum / student.grades.length : 0;
    }
    // Method to display all students and their grades
    displayStudents() {
        console.log('=== Students ===');
        this.students.forEach(student => {
            console.log(`ID: ${student.id}, Name: ${student.name}, Grades: ${student.grades.join(', ')}`);
        });
        this.displayMenu();
    }
    // Helper method to ask a question and return user input as a promise
    askQuestion(question) {
        return new Promise(resolve => {
            this.rl.question(question, resolve);
        });
    }
}
// Create an instance of StudentGradeApp and start the application
const studentGradeApp = new StudentGradeApp();
studentGradeApp.startApp();
