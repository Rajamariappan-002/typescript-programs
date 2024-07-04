import * as readline from 'readline';

// Interface for Exchange Rates
interface ExchangeRates {
  [currency: string]: number;
}

// Built-in exchange rates (sample values, replace with actual rates)
const exchangeRates: ExchangeRates = {
  USD: 1.18,   // 1 EUR = 1.18 USD
  GBP: 0.86,   // 1 EUR = 0.86 GBP
  JPY: 130.11, // 1 EUR = 130.11 JPY
};

// Function to convert currency
function convertCurrency(amount: number, from: string, to: string, rates: ExchangeRates): number {
  const fromRate = rates[from];
  const toRate = rates[to];

  if (!fromRate || !toRate) {
    throw new Error('Invalid currency code');
  }

  // Convert amount from 'from' currency to 'to' currency
  return (amount * toRate) / fromRate;
}

// Function to display currency conversion result
function displayConversionResult(amount: number, from: string, to: string, convertedAmount: number) {
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
  rl.question('Enter amount to convert: ', (amountInput: string) => {
    const amount = parseFloat(amountInput);
    if (isNaN(amount)) {
      console.log('Invalid amount. Please enter a valid number.');
      rl.close();
      return;
    }

    rl.question('Enter currency to convert from (e.g., USD): ', (fromCurrency: string) => {
      fromCurrency = fromCurrency.toUpperCase();
      if (!exchangeRates[fromCurrency]) {
        console.log('Invalid currency code. Please enter a valid currency.');
        rl.close();
        return;
      }

      rl.question('Enter currency to convert to (e.g., GBP): ', (toCurrency: string) => {
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
