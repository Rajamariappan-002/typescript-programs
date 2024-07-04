import * as readline from 'readline';

// Interface for Book
interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

// Class to manage Library
class Library {
  private books: Book[] = [];
  private nextId: number = 1;

  // Method to add a new book to the library
  addBook(title: string, author: string) {
    const book: Book = {
      id: this.nextId++,
      title,
      author,
      available: true
    };
    this.books.push(book);
    console.log(`Book added: ${title} by ${author}`);
  }

  // Method to display all books in the library
  displayBooks() {
    console.log('=== Library Books ===');
    this.books.forEach(book => {
      console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Available: ${book.available ? 'Yes' : 'No'}`);
    });
    console.log('====================');
  }

  // Method to lend a book by ID
  lendBook(id: number) {
    const index = this.books.findIndex(book => book.id === id && book.available);
    if (index !== -1) {
      this.books[index].available = false;
      console.log(`Book with ID ${id} has been lent.`);
    } else {
      console.log(`Book with ID ${id} not found or already lent.`);
    }
  }

  // Method to return a book by ID
  returnBook(id: number) {
    const index = this.books.findIndex(book => book.id === id && !book.available);
    if (index !== -1) {
      this.books[index].available = true;
      console.log(`Book with ID ${id} has been returned.`);
    } else {
      console.log(`Book with ID ${id} not found or already available.`);
    }
  }
}

// Function to display menu options
function displayMenu() {
  console.log('=== Library Management Menu ===');
  console.log('1. Add Book');
  console.log('2. Display All Books');
  console.log('3. Lend a Book');
  console.log('4. Return a Book');
  console.log('5. Exit');
}

const library = new Library();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => {
  console.log('Exiting Library Management. Goodbye!');
  process.exit(0);
});

// Function to start the library management application
function startLibraryManagement() {
  displayMenu();
  rl.question('Select an option: ', (option: string) => {
    switch (option.trim()) {
      case '1':
        rl.question('Enter book title: ', (title: string) => {
          rl.question('Enter book author: ', (author: string) => {
            library.addBook(title, author);
            startLibraryManagement();
          });
        });
        break;
      case '2':
        library.displayBooks();
        startLibraryManagement();
        break;
      case '3':
        rl.question('Enter book ID to lend: ', (idStr: string) => {
          const id = parseInt(idStr);
          if (!isNaN(id)) {
            library.lendBook(id);
          } else {
            console.log('Invalid ID. Please enter a valid number.');
          }
          startLibraryManagement();
        });
        break;
      case '4':
        rl.question('Enter book ID to return: ', (idStr: string) => {
          const id = parseInt(idStr);
          if (!isNaN(id)) {
            library.returnBook(id);
          } else {
            console.log('Invalid ID. Please enter a valid number.');
          }
          startLibraryManagement();
        });
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid option. Please select a number from 1 to 5.');
        startLibraryManagement();
        break;
    }
  });
}

console.log('Welcome to the Library Management System!');
startLibraryManagement();
