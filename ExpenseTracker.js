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
class ExpenseTracker {
    constructor() {
        this.expenses = [];
        this.nextId = 1;
    }
    addExpense(description, amount) {
        const expense = {
            id: this.nextId++,
            description,
            amount,
        };
        this.expenses.push(expense);
        console.log(`Expense added: ${description} - $${amount}`);
    }
    deleteExpense(id) {
        const index = this.expenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            const deletedExpense = this.expenses.splice(index, 1)[0];
            console.log(`Expense deleted: ${deletedExpense.description} - $${deletedExpense.amount}`);
        }
        else {
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
    rl.question('Select an option: ', (option) => {
        switch (option.trim()) {
            case '1':
                rl.question('Enter expense description: ', (description) => {
                    rl.question('Enter expense amount: ', (amountStr) => {
                        const amount = parseFloat(amountStr);
                        if (!isNaN(amount)) {
                            expenseTracker.addExpense(description, amount);
                        }
                        else {
                            console.log('Invalid amount. Please enter a valid number.');
                        }
                        startExpenseTracker();
                    });
                });
                break;
            case '2':
                rl.question('Enter expense ID to delete: ', (idStr) => {
                    const id = parseInt(idStr);
                    if (!isNaN(id)) {
                        expenseTracker.deleteExpense(id);
                    }
                    else {
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
