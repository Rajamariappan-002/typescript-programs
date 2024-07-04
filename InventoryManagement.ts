import * as readline from 'readline';


interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}


class InventoryManagement {
  private products: Product[] = [];
  private nextId: number = 1;
  private rl: readline.Interface;

  constructor() {
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

    this.rl.question('Enter your choice: ', (input: string) => {
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
    this.rl.question('Enter product name: ', (name: string) => {
      this.rl.question('Enter product quantity: ', (quantityInput: string) => {
        const quantity = parseInt(quantityInput);
        this.rl.question('Enter product price: ', (priceInput: string) => {
          const price = parseFloat(priceInput);
          const newProduct: Product = { id: this.nextId++, name, quantity, price };
          this.products.push(newProduct);
          console.log(`Product "${name}" added.`);
          this.displayMenu();
        });
      });
    });
  }

  // Method to update product quantity
  updateProductQuantity() {
    this.rl.question('Enter product ID to update quantity: ', (input: string) => {
      const id = parseInt(input.trim());
      const product = this.products.find(product => product.id === id);
      if (product) {
        this.rl.question(`Enter new quantity for ${product.name}: `, (quantityInput: string) => {
          const newQuantity = parseInt(quantityInput);
          product.quantity = newQuantity;
          console.log(`Quantity updated for ${product.name} (${product.id}) to ${newQuantity}.`);
        });
      } else {
        console.log(`Product with ID ${id} not found.`);
      }
      this.displayMenu();
    });
  }

  // Method to delete a product
  deleteProduct() {
    this.rl.question('Enter product ID to delete: ', (input: string) => {
      const id = parseInt(input.trim());
      const index = this.products.findIndex(product => product.id === id);
      if (index !== -1) {
        const deletedProduct = this.products.splice(index, 1)[0];
        console.log(`Product "${deletedProduct.name}" deleted.`);
      } else {
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
