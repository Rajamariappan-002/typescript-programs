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
class GuessingGame {
    constructor() {
        this.attempts = 0;
        this.maxAttempts = 5;
        this.targetNumber = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    startGame() {
        console.log('Welcome to the Guessing Game!');
        console.log('Try to guess the number between 1 and 100.');
        this.askForGuess();
    }
    askForGuess() {
        this.rl.question('Enter your guess: ', (input) => {
            const guess = parseInt(input.trim());
            if (isNaN(guess) || guess < 1 || guess > 100) {
                console.log('Please enter a number between 1 and 100.');
                this.askForGuess();
            }
            else {
                this.attempts++;
                if (guess === this.targetNumber) {
                    this.handleWin();
                }
                else {
                    this.handleIncorrectGuess(guess);
                }
            }
        });
    }
    handleIncorrectGuess(guess) {
        const message = guess < this.targetNumber ? 'Too low!' : 'Too high!';
        console.log(message);
        if (this.attempts < this.maxAttempts) {
            console.log(`Attempts left: ${this.maxAttempts - this.attempts}`);
            this.askForGuess();
        }
        else {
            this.handleLoss();
        }
    }
    handleWin() {
        console.log(`Congratulations! You guessed the number ${this.targetNumber} in ${this.attempts} attempts.`);
        this.endGame();
    }
    handleLoss() {
        console.log(`Sorry, you've run out of attempts. The number was ${this.targetNumber}.`);
        this.endGame();
    }
    endGame() {
        this.rl.close();
        console.log('Thank you for playing!');
    }
}
// Start the game
const game = new GuessingGame();
game.startGame();
