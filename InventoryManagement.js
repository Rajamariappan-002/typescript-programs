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
class InventoryManagement {
    constructor() {
        this.products = [];
        this.nextId = 1;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.products.push({ id: this.nextId++, name: 'Laptop', quantity: 5, price: 1000 });
        this.products.push({ id: this.nextId++, name: 'Mouse', quantity: 10, price: 20 });
        this.products.push({ id: this.nextId++, name: 'Keyboard', quantity: 8, price: 50 });
        this.products.push({ id: this.nextId++, name: 'Monitor', quantity: 3, price: 300 });
    }
    startApp() {
        console.log('Welcome to the Inventory Management App!');
        this.displayMenu();
    }
    displayMenu() {
        console.log(`
    === Menu ===
    1. Add Product
    2. Update Product Quantity
    3. Delete Product
    4. View Inventory
    5. Exit
    `);
        this.rl.question('Enter your choice: ', (input) => {
            switch (input.trim()) {
                case '1':
                    this.addProduct();
                    break;
                case '2':
                    this.updateProductQuantity();
                    break;
                case '3':
                    this.deleteProduct();
                    break;
                case '4':
                    this.viewInventory();
                    break;
                case '5':
                    this.rl.close();
                    console.log('Exiting Inventory Management App.');
                    break;
                default:
                    console.log('Invalid choice. Please enter a number from 1 to 5.');
                    this.displayMenu();
                    break;
            }
        });
    }
    // Method to add a new product
    addProduct() {
        this.rl.question('Enter product name: ', (name) => {
            this.rl.question('Enter product quantity: ', (quantityInput) => {
                const quantity = parseInt(quantityInput);
                this.rl.question('Enter product price: ', (priceInput) => {
                    const price = parseFloat(priceInput);
                    const newProduct = { id: this.nextId++, name, quantity, price };
                    this.products.push(newProduct);
                    console.log(`Product "${name}" added.`);
                    this.displayMenu();
                });
            });
        });
    }
    // Method to update product quantity
    updateProductQuantity() {
        this.rl.question('Enter product ID to update quantity: ', (input) => {
            const id = parseInt(input.trim());
            const product = this.products.find(product => product.id === id);
            if (product) {
                this.rl.question(`Enter new quantity for ${product.name}: `, (quantityInput) => {
                    const newQuantity = parseInt(quantityInput);
                    product.quantity = newQuantity;
                    console.log(`Quantity updated for ${product.name} (${product.id}) to ${newQuantity}.`);
                });
            }
            else {
                console.log(`Product with ID ${id} not found.`);
            }
            this.displayMenu();
        });
    }
    // Method to delete a product
    deleteProduct() {
        this.rl.question('Enter product ID to delete: ', (input) => {
            const id = parseInt(input.trim());
            const index = this.products.findIndex(product => product.id === id);
            if (index !== -1) {
                const deletedProduct = this.products.splice(index, 1)[0];
                console.log(`Product "${deletedProduct.name}" deleted.`);
            }
            else {
                console.log(`Product with ID ${id} not found.`);
            }
            this.displayMenu();
        });
    }
    // Method to view all products in inventory
    viewInventory() {
        console.log('=== Inventory ===');
        this.products.forEach(product => {
            console.log(`ID: ${product.id}, Name: ${product.name}, Quantity: ${product.quantity}, Price: $${product.price}`);
        });
        this.displayMenu();
    }
}
// Create an instance of InventoryManagement and start the application
const inventoryManagement = new InventoryManagement();
inventoryManagement.startApp();
