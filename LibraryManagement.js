"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Class to manage Library
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
        this.nextId = 1;
    }
    // Method to add a new book to the library
    Library.prototype.addBook = function (title, author) {
        var book = {
            id: this.nextId++,
            title: title,
            author: author,
            available: true
        };
        this.books.push(book);
        console.log("Book added: ".concat(title, " by ").concat(author));
    };
    // Method to display all books in the library
    Library.prototype.displayBooks = function () {
        console.log('=== Library Books ===');
        this.books.forEach(function (book) {
            console.log("ID: ".concat(book.id, ", Title: ").concat(book.title, ", Author: ").concat(book.author, ", Available: ").concat(book.available ? 'Yes' : 'No'));
        });
        console.log('====================');
    };
    // Method to lend a book by ID
    Library.prototype.lendBook = function (id) {
        var index = this.books.findIndex(function (book) { return book.id === id && book.available; });
        if (index !== -1) {
            this.books[index].available = false;
            console.log("Book with ID ".concat(id, " has been lent."));
        }
        else {
            console.log("Book with ID ".concat(id, " not found or already lent."));
        }
    };
    // Method to return a book by ID
    Library.prototype.returnBook = function (id) {
        var index = this.books.findIndex(function (book) { return book.id === id && !book.available; });
        if (index !== -1) {
            this.books[index].available = true;
            console.log("Book with ID ".concat(id, " has been returned."));
        }
        else {
            console.log("Book with ID ".concat(id, " not found or already available."));
        }
    };
    return Library;
}());
// Function to display menu options
function displayMenu() {
    console.log('=== Library Management Menu ===');
    console.log('1. Add Book');
    console.log('2. Display All Books');
    console.log('3. Lend a Book');
    console.log('4. Return a Book');
    console.log('5. Exit');
}
var library = new Library();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('close', function () {
    console.log('Exiting Library Management. Goodbye!');
    process.exit(0);
});
// Function to start the library management application
function startLibraryManagement() {
    displayMenu();
    rl.question('Select an option: ', function (option) {
        switch (option.trim()) {
            case '1':
                rl.question('Enter book title: ', function (title) {
                    rl.question('Enter book author: ', function (author) {
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
                rl.question('Enter book ID to lend: ', function (idStr) {
                    var id = parseInt(idStr);
                    if (!isNaN(id)) {
                        library.lendBook(id);
                    }
                    else {
                        console.log('Invalid ID. Please enter a valid number.');
                    }
                    startLibraryManagement();
                });
                break;
            case '4':
                rl.question('Enter book ID to return: ', function (idStr) {
                    var id = parseInt(idStr);
                    if (!isNaN(id)) {
                        library.returnBook(id);
                    }
                    else {
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
