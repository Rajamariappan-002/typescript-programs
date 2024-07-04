import * as readline from 'readline';

class GuessingGame {
  private readonly targetNumber: number;
  private attempts: number = 0;
  private readonly maxAttempts: number = 5;
  private rl: readline.Interface;

  constructor() {
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
    this.rl.question('Enter your guess: ', (input: string) => {
      const guess = parseInt(input.trim());

      if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log('Please enter a number between 1 and 100.');
        this.askForGuess();
      } else {
        this.attempts++;

        if (guess === this.targetNumber) {
          this.handleWin();
        } else {
          this.handleIncorrectGuess(guess);
        }
      }
    });
  }

  handleIncorrectGuess(guess: number) {
    const message = guess < this.targetNumber ? 'Too low!' : 'Too high!';
    console.log(message);

    if (this.attempts < this.maxAttempts) {
      console.log(`Attempts left: ${this.maxAttempts - this.attempts}`);
      this.askForGuess();
    } else {
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
