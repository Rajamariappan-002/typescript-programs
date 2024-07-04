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
const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Mouse', price: 20 },
    { id: 3, name: 'Keyboard', price: 50 },
    { id: 4, name: 'Monitor', price: 300 },
];
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    addItem(product) {
        this.items.push(product);
    }
    calculateTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
    displayCart() {
        console.log('=== Shopping Cart Contents ===');
        this.items.forEach(item => {
            console.log(`- ${item.name}: $${item.price}`);
        });
        console.log(`Total: $${this.calculateTotal()}`);
    }
}
function displayProductMenu() {
    console.log('=== Available Products ===');
    products.forEach(product => {
        console.log(`[${product.id}] ${product.name}: $${product.price}`);
    });
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter product ID to add to cart (or "q" to quit): ', (input) => {
        // Convert input to lower case for case-insensitive comparison
        const userInput = input.trim().toLowerCase();
        if (userInput === 'q') {
            console.log('Exiting...');
            rl.close();
            // Display cart contents and total after user exits
            cart.displayCart();
            // Terminate the Node.js process after displaying cart contents
            process.exit(0);
        }
        else {
            const productId = parseInt(userInput);
            // Check if the input is a valid product ID
            const selectedProduct = products.find(product => product.id === productId);
            if (selectedProduct) {
                cart.addItem(selectedProduct);
                console.log(`${selectedProduct.name} added to cart.`);
            }
            else {
                console.log('Invalid input. Please enter a valid product ID or "q" to quit.');
            }
            // Close readline interface after handling input
            rl.close();
            // Display menu again after processing input
            displayProductMenu();
        }
    });
}
const cart = new ShoppingCart();
console.log('Welcome to the Shopping App!');
displayProductMenu();
