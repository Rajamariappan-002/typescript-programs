import * as readline from 'readline';

interface Expense {
  id: number;
  description: string;
  amount: number;
}

class ExpenseTracker {
  private expenses: Expense[] = [];
  private nextId: number = 1;

  addExpense(description: string, amount: number) {
    const expense: Expense = {
      id: this.nextId++,
      description,
      amount,
    };
    this.expenses.push(expense);
    console.log(`Expense added: ${description} - $${amount}`);
  }

  deleteExpense(id: number) {
    const index = this.expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
      const deletedExpense = this.expenses.splice(index, 1)[0];
      console.log(`Expense deleted: ${deletedExpense.description} - $${deletedExpense.amount}`);
    } else {
      console.log(`Expense with ID ${id} not found.`);
    }
  }

  viewExpenses() {
    console.log('=== Expense List ===');
    this.expenses.forEach(expense => {
      console.log(`ID: ${expense.id}, Description: ${expense.description}, Amount: $${expense.amount}`);
    });
    console.log('====================');
  }

  calculateTotal() {
    const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`Total Expenses: $${total}`);
  }
}

function displayMenu() {
  console.log('=== Expense Tracker Menu ===');
  console.log('1. Add Expense');
  console.log('2. Delete Expense');
  console.log('3. View Expenses');
  console.log('4. Calculate Total Expenses');
  console.log('5. Exit');
}

const expenseTracker = new ExpenseTracker();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => {
  console.log('Exiting Expense Tracker. Goodbye!');
  process.exit(0);
});

function startExpenseTracker() {
  displayMenu();
  rl.question('Select an option: ', (option: string) => {
    switch (option.trim()) {
      case '1':
        rl.question('Enter expense description: ', (description: string) => {
          rl.question('Enter expense amount: ', (amountStr: string) => {
            const amount = parseFloat(amountStr);
            if (!isNaN(amount)) {
              expenseTracker.addExpense(description, amount);
            } else {
              console.log('Invalid amount. Please enter a valid number.');
            }
            startExpenseTracker();
          });
        });
        break;
      case '2':
        rl.question('Enter expense ID to delete: ', (idStr: string) => {
          const id = parseInt(idStr);
          if (!isNaN(id)) {
            expenseTracker.deleteExpense(id);
          } else {
            console.log('Invalid ID. Please enter a valid number.');
          }
          startExpenseTracker();
        });
        break;
      case '3':
        expenseTracker.viewExpenses();
        startExpenseTracker();
        break;
      case '4':
        expenseTracker.calculateTotal();
        startExpenseTracker();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log('Invalid option. Please select a number from 1 to 5.');
        startExpenseTracker();
        break;
    }
  });
}

console.log('Welcome to the Expense Tracker App!');
startExpenseTracker();
