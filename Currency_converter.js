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
// Built-in exchange rates (sample values, replace with actual rates)
const exchangeRates = {
    USD: 1.18, // 1 EUR = 1.18 USD
    GBP: 0.86, // 1 EUR = 0.86 GBP
    JPY: 130.11, // 1 EUR = 130.11 JPY
};
// Function to convert currency
function convertCurrency(amount, from, to, rates) {
    const fromRate = rates[from];
    const toRate = rates[to];
    if (!fromRate || !toRate) {
        throw new Error('Invalid currency code');
    }
    // Convert amount from 'from' currency to 'to' currency
    return (amount * toRate) / fromRate;
}
// Function to display currency conversion result
function displayConversionResult(amount, from, to, convertedAmount) {
    console.log(`${amount} ${from} is ${convertedAmount.toFixed(2)} ${to}`);
}
// Main function to handle user input and conversion
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('=== Currency Converter ===');
    console.log('Available currencies:', Object.keys(exchangeRates).join(', '));
    // Get user input for conversion
    rl.question('Enter amount to convert: ', (amountInput) => {
        const amount = parseFloat(amountInput);
        if (isNaN(amount)) {
            console.log('Invalid amount. Please enter a valid number.');
            rl.close();
            return;
        }
        rl.question('Enter currency to convert from (e.g., USD): ', (fromCurrency) => {
            fromCurrency = fromCurrency.toUpperCase();
            if (!exchangeRates[fromCurrency]) {
                console.log('Invalid currency code. Please enter a valid currency.');
                rl.close();
                return;
            }
            rl.question('Enter currency to convert to (e.g., GBP): ', (toCurrency) => {
                toCurrency = toCurrency.toUpperCase();
                if (!exchangeRates[toCurrency]) {
                    console.log('Invalid currency code. Please enter a valid currency.');
                    rl.close();
                    return;
                }
                // Perform currency conversion
                const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency, exchangeRates);
                displayConversionResult(amount, fromCurrency, toCurrency, convertedAmount);
                rl.close();
            });
        });
    });
}
// Start the currency converter application
console.log('Welcome to Currency Converter App!');
main();
