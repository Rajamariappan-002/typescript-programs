import * as readline from 'readline';

// Define an interface for a Student
interface Student {
  id: number;
  name: string;
  grades: number[];
}

// Class representing the Student Grade application
class StudentGradeApp {
  private students: Student[] = [];
  private nextId: number = 1;
  private rl: readline.Interface;

  constructor() {
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

    this.rl.question('Enter your choice: ', (input: string) => {
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
    this.rl.question('Enter student name: ', (name: string) => {
      const newStudent: Student = { id: this.nextId++, name, grades: [] };
      this.students.push(newStudent);
      console.log(`Student "${name}" added with ID ${newStudent.id}.`);
      this.displayMenu();
    });
  }

  // Method to enter grades for a student
  async enterGrades() {
    const idInput = await this.askQuestion('Enter student ID to enter grades: ');
    const id = parseInt(idInput.trim());
    const student = this.students.find(student => student.id === id);
    
    if (!student) {
      console.log(`Student with ID ${id} not found.`);
      this.displayMenu();
      return;
    }
    
    const gradesInput = await this.askQuestion(`Enter grades for ${student.name} (comma-separated): `);
    const grades = gradesInput.split(',').map(grade => parseFloat(grade.trim()));
    student.grades = grades;
    console.log(`Grades entered for ${student.name}.`);
    this.displayMenu();
  }

  // Method to calculate average grade for a student
  calculateAverageGrade() {
    this.rl.question('Enter student ID to calculate average grade: ', (input: string) => {
      const id = parseInt(input.trim());
      const student = this.students.find(student => student.id === id);
      if (student) {
        const averageGrade = this.calculateAverage(student);
        console.log(`Average grade for ${student.name}: ${averageGrade.toFixed(2)}`);
      } else {
        console.log(`Student with ID ${id} not found.`);
      }
      this.displayMenu();
    });
  }

  // Method to calculate average grade for a student
  private calculateAverage(student: Student): number {
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
  private askQuestion(question: string): Promise<string> {
    return new Promise(resolve => {
      this.rl.question(question, resolve);
    });
  }
}

// Create an instance of StudentGradeApp and start the application
const studentGradeApp = new StudentGradeApp();
studentGradeApp.startApp();
